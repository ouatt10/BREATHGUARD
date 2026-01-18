#include <Arduino.h>
#include <Wire.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "secrets.h" 

// --- 1. BIBLIOTHÈQUES ---
#include <DHT.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include "MAX30100_PulseOximeter.h"
#include <OneWire.h>
#include <DallasTemperature.h>

// --- 2. CONFIGURATION DES PINS ---
#define DHTPIN 15           
#define DHTTYPE DHT22
#define MQ2_PIN 34          // Gaz (Analogique A0)
#define ONE_WIRE_BUS 4      // Temp Corporelle (DS18B20)

// --- 3. OBJETS ---
DHT dht(DHTPIN, DHTTYPE);
Adafruit_MPU6050 mpu;
PulseOximeter pox;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

WiFiClient espClient;
PubSubClient client(espClient);

// --- VARIABLES ---
long lastMsg = 0;
float currentSpO2 = 0;
float currentBPM = 0;

// Callback nécessaire pour le MAX30100
void onBeatDetected() {
    // Serial.print("♥"); // Décommentez pour voir les battements en direct
}

// --- FONCTIONS SYSTÈME ---
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("📡 Connexion WiFi à : ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int tentatives = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    tentatives++;
    if (tentatives > 20) {
        Serial.println("\n❌ Echec WiFi. Vérifiez secrets.h !");
        break; 
    }
  }
  Serial.println("\n✅ WiFi Connecté ! IP: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("☁️ Connexion MQTT...");
    String clientId = "BreathGuard-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("✅ Connecté !");
    } else {
      Serial.print("❌ Echec (rc=");
      Serial.print(client.state());
      Serial.println(") - Réessai 5s...");
      delay(5000);
    }
  }
}

// --- INITIALISATION (SETUP) ---
void setup() {
  Serial.begin(115200);
  Wire.begin(); // Démarrage I2C (SDA=21, SCL=22)
  
  Serial.println("\n\n--- 🏥 DÉMARRAGE DU DIAGNOSTIC SYSTÈME ---");

  // 1. WiFi & Réseau
  setup_wifi();
  client.setServer(MQTT_SERVER, MQTT_PORT);

  // 2. Capteur DHT22 (Air)
  Serial.print("1. DHT22 (Air)......... ");
  dht.begin();
  float testH = dht.readHumidity();
  if (isnan(testH)) Serial.println("⚠️ ERREUR (Vérifiez Pin 15)");
  else Serial.println("✅ OK");

  // 3. Capteur DS18B20 (Fièvre)
  Serial.print("2. DS18B20 (Corps)..... ");
  sensors.begin();
  if (sensors.getDeviceCount() == 0) Serial.println("⚠️ NON DÉTECTÉ (Vérifiez Pin 4)");
  else Serial.println("✅ OK (" + String(sensors.getDeviceCount()) + " sonde)");

  // 4. Capteur MPU6050 (Mouvement)
  Serial.print("3. MPU6050 (Resp)...... ");
  if (!mpu.begin()) {
    Serial.println("❌ ERREUR I2C (Vérifiez câbles SDA/SCL)");
  } else {
    Serial.println("✅ OK");
    mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
    mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  }

  // 5. Capteur MAX30100 (Coeur)
  Serial.print("4. MAX30100 (SpO2)..... ");
  if (!pox.begin()) {
    Serial.println("❌ ERREUR I2C (Conflit ou Alim)");
  } else {
    Serial.println("✅ OK");
    pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
    pox.setOnBeatDetectedCallback(onBeatDetected);
  }

  // 6. Capteur MQ-2 (Gaz)
  Serial.println("5. MQ-2 (Gaz).......... ✅ OK (Lecture Analogique Pin 34)");

  Serial.println("--- FIN DIAGNOSTIC. DÉBUT DU MONITORING ---\n");
}

// --- BOUCLE PRINCIPALE (LOOP) ---
void loop() {
  if (!client.connected()) reconnect();
  client.loop();
  
  // Mise à jour critique du MAX30100 (doit tourner vite)
  pox.update();

  long now = millis();
  if (now - lastMsg > 5000) { // Toutes les 5 secondes
    lastMsg = now;

    // --- A. LECTURE DES VALEURS ---
    
    // Environnement
    float h = dht.readHumidity();
    float t_amb = dht.readTemperature();
    int gas_raw = analogRead(MQ2_PIN); // 0 à 4095

    // Corps (DS18B20)
    sensors.requestTemperatures(); 
    float t_body = sensors.getTempCByIndex(0);

    // Mouvement (MPU6050)
    sensors_event_t a, g, temp;
    float resp_z = 0;
    if (mpu.getAccelerometerRange() != 0) { // Si MPU connecté
        mpu.getEvent(&a, &g, &temp);
        resp_z = a.acceleration.z;
    }

    // Coeur (MAX30100)
    currentSpO2 = pox.getSpO2();
    currentBPM = pox.getHeartRate();

    // Simulation Audio (Cough) basée sur le gaz pour le test
    bool cough = (gas_raw > 2000); 

    // Nettoyage des erreurs (NaN -> 0)
    if (isnan(h)) h = 0; 
    if (isnan(t_amb)) t_amb = 0;
    if (t_body == -127.00 || t_body == 85.00) t_body = 0; // Codes erreur DS18B20

    // --- B. AFFICHAGE LOCAL (Moniteur Série) ---
    Serial.println("--- 📊 RAPPORT CAPTEURS ---");
    Serial.print("🌡️ Air: "); Serial.print(t_amb); Serial.print("°C | 💧 Hum: "); Serial.print(h); Serial.println("%");
    Serial.print("🌫️ Gaz: "); Serial.println(gas_raw);
    Serial.print("🤒 Corps: "); Serial.print(t_body); Serial.println("°C");
    Serial.print("💓 BPM: "); Serial.print(currentBPM); Serial.print(" | 🌬️ SpO2: "); Serial.print(currentSpO2); Serial.println("%");
    Serial.print("📉 Resp (Z): "); Serial.println(resp_z);
    
    // --- C. ENVOI MQTT (JSON) ---
    String json = "{";
    json += "\"temp_amb\": " + String(t_amb) + ",";
    json += "\"hum\": " + String(h) + ",";
    json += "\"gas\": " + String(gas_raw) + ",";
    json += "\"spo2\": " + String(currentSpO2) + ",";
    json += "\"bpm\": " + String(currentBPM) + ",";
    json += "\"body_temp\": " + String(t_body) + ",";
    json += "\"resp_z\": " + String(resp_z) + ",";
    json += "\"cough_detected\": " + String(cough ? "true" : "false");
    json += "}";

    Serial.print("📤 Envoi Cloud: ");
    Serial.println(json);
    Serial.println("---------------------------\n");

    client.publish(MQTT_TOPIC_DATA, json.c_str());
  }
}