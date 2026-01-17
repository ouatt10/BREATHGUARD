#include <Arduino.h>
#include <Wire.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "secrets.h" // Vos mots de passe sont ici

// --- BIBLIOTHÈQUES CAPTEURS ---
#include <DHT.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include "MAX30100_PulseOximeter.h"

// --- DÉFINITIONS PINS (On garde tout le plan pour le futur) ---
#define DHTPIN 15
#define DHTTYPE DHT22
// #define MQ2_PIN 34       // En attente
// #define ONE_WIRE_BUS 4   // En attente (DS18B20)

// --- OBJETS ---
DHT dht(DHTPIN, DHTTYPE);
Adafruit_MPU6050 mpu;
PulseOximeter pox;
WiFiClient espClient;
PubSubClient client(espClient);

// --- VARIABLES ---
long lastMsg = 0;
float spo2 = 0;
float bpm = 0;

// Callback nécessaire pour le MAX30100
void onBeatDetected() {
    // Serial.println("♥"); // Décommenter pour debug visuel
}

// --- FONCTION DE CONNEXION WIFI ---
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connexion au WiFi: ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connecté !");
  Serial.print("Adresse IP: ");
  Serial.println(WiFi.localIP());
}

// --- FONCTION DE CONNEXION MQTT ---
void reconnect() {
  while (!client.connected()) {
    Serial.print("Connexion au broker MQTT...");
    // ID Client unique basé sur l'heure pour éviter les conflits
    String clientId = "BreathGuardClient-";
    clientId += String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println("Connecté !");
    } else {
      Serial.print("Échec, rc=");
      Serial.print(client.state());
      Serial.println(" nouvelle tentative dans 5s");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  
  // 1. Démarrage des bus
  Wire.begin(); // I2C pour MAX et MPU
  setup_wifi();
  client.setServer(MQTT_SERVER, MQTT_PORT);

  // 2. Initialisation des CAPTEURS ACTIFS
  Serial.print("Init DHT22... ");
  dht.begin();
  Serial.println("OK");

  Serial.print("Init MPU6050... ");
  if (!mpu.begin()) {
    Serial.println("ERREUR MPU6050 (Vérifiez câblage)");
    // while (1); // On ne bloque pas le code pour l'instant
  } else {
    Serial.println("OK");
    mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
    mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  }

  Serial.print("Init MAX30100... ");
  if (!pox.begin()) {
    Serial.println("ERREUR MAX30100 (Vérifiez câblage/Alim)");
  } else {
    Serial.println("OK");
    pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
    pox.setOnBeatDetectedCallback(onBeatDetected);
  }

  // Les autres capteurs (MQ2, DS18B20) sont ignorés pour l'instant
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  // LE MAX30100 DOIT ÊTRE MIS À JOUR TRÈS SOUVENT
  pox.update();

  // Envoi des données toutes les 5 secondes (5000ms)
  long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;

    // --- A. LECTURE DES CAPTEURS ACTIFS ---
    
    // 1. Environnement (DHT22)
    float h = dht.readHumidity();
    float t = dht.readTemperature(); // Temp ambiante
    if (isnan(h) || isnan(t)) { h = 0; t = 0; Serial.println("Echec lecture DHT"); }

    // 2. Respiration (MPU6050)
    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);
    float resp_movement = a.acceleration.z; // On surveille le soulèvement du torse

    // 3. Constantes (MAX30100)
    // On prend les valeurs stockées par la librairie
    spo2 = pox.getSpO2();
    bpm = pox.getHeartRate();


    // --- B. VALEURS "FANTÔMES" POUR LES CAPTEURS ABSENTS ---
    // Ces valeurs seront remplacées plus tard quand vous aurez les câbles
    float body_temp = 0.0; // DS18B20 absent
    int gas_level = 0;     // MQ-2 absent
    String cough_status = "Non detecte"; // Micro absent

    // --- C. CRÉATION DU JSON (Le paquet de données) ---
    // Format : {"temp_amb": 24, "hum": 40, "spo2": 98, ...}
    
    String jsonPayload = "{";
    jsonPayload += "\"temp_amb\": " + String(t) + ",";
    jsonPayload += "\"hum\": " + String(h) + ",";
    jsonPayload += "\"spo2\": " + String(spo2) + ",";
    jsonPayload += "\"bpm\": " + String(bpm) + ",";
    jsonPayload += "\"resp_z\": " + String(resp_movement) + ",";
    // Les champs "futurs" (pour que l'App soit prête)
    jsonPayload += "\"body_temp\": " + String(body_temp) + ",";
    jsonPayload += "\"gas\": " + String(gas_level);
    jsonPayload += "}";

    // --- D. ENVOI VERS LE CLOUD ---
    Serial.print("Envoi MQTT : ");
    Serial.println(jsonPayload);
    
    // Conversion String -> char array pour MQTT
    client.publish(MQTT_TOPIC_DATA, jsonPayload.c_str());
  }
}