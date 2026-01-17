#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>

// 1. BIBLIOTHEQUES CAPTEURS
#include <DHT.h>                // Pour DHT22
#include <OneWire.h>            // Pour DS18B20
#include <DallasTemperature.h>  // Pour DS18B20
#include <Adafruit_MPU6050.h>   // Pour MPU6050
#include <Adafruit_Sensor.h>
#include "MAX30100_PulseOximeter.h" // Pour MAX30100
#include <driver/i2s.h>         // Pour Micro INMP441 (Natif ESP32)

// 2. DÉFINITION DES BROCHES (PINOUT VALIDÉ PAR LE CHEF TECH)
#define DHTPIN 15           // DHT22 sur GPIO 15
#define DHTTYPE DHT22

#define ONE_WIRE_BUS 4      // DS18B20 sur GPIO 4

#define MQ2_PIN 34          // MQ-2 sur Analog ADC1 (GPIO 34)

// Pins I2S pour le Microphone INMP441
#define I2S_WS 25
#define I2S_SD 32
#define I2S_SCK 33
#define I2S_PORT I2S_NUM_0

// 3. CRÉATION DES OBJETS
DHT dht(DHTPIN, DHTTYPE);
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
Adafruit_MPU6050 mpu;
PulseOximeter pox;

// Variable pour le timing d'affichage
uint32_t tsLastReport = 0;

// Callback pour le MAX30100 (détection de battement)
void onBeatDetected() {
    Serial.println("♥ Battement détecté !");
}

void setup() {
    // Initialisation de la communication Série
    Serial.begin(115200);
    while (!Serial); // Attendre que le port série soit prêt
    Serial.println("\n--- DÉMARRAGE DU DIAGNOSTIC BREATHGUARD ---");

    // A. INITIALISATION I2C (Commune pour MAX30100 et MPU6050)
    // SDA = 21, SCL = 22 par défaut sur ESP32
    Wire.begin();
    
    // B. TEST DU DHT22 (Air Ambiant)
    Serial.print("1. Initialisation DHT22... ");
    dht.begin();
    float testHum = dht.readHumidity();
    if (isnan(testHum)) {
        Serial.println("ERREUR ! Vérifiez le câblage GPIO 15");
    } else {
        Serial.println("OK");
    }

    // C. TEST DU DS18B20 (Température Corporelle)
    Serial.print("2. Initialisation DS18B20... ");
    sensors.begin();
    if (sensors.getDeviceCount() == 0) {
         Serial.println("ERREUR ! Aucun capteur trouvé sur GPIO 4");
    } else {
         Serial.print("OK. Capteurs trouvés: ");
         Serial.println(sensors.getDeviceCount());
    }

    // D. TEST DU MPU-6050 (Respiration)
    Serial.print("3. Initialisation MPU-6050... ");
    if (!mpu.begin()) {
        Serial.println("ERREUR ! MPU6050 introuvable (Vérifiez I2C 0x68)");
    } else {
        Serial.println("OK");
        mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
        mpu.setGyroRange(MPU6050_RANGE_500_DEG);
        mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
    }

    // E. TEST DU MAX30100 (Coeur/SpO2)
    Serial.print("4. Initialisation MAX30100... ");
    if (!pox.begin()) {
        Serial.println("ERREUR ! MAX30100 introuvable (Vérifiez I2C, Pull-ups ou 3.3V)");
    } else {
        Serial.println("OK");
        pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA); // Courant LED modéré
        pox.setOnBeatDetectedCallback(onBeatDetected);
    }

    // F. CONFIGURATION DU MICRO INMP441 (I2S)
    Serial.print("5. Configuration I2S (Microphone)... ");
    const i2s_config_t i2s_config = {
        .mode = i2s_mode_t(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = 16000, // 16kHz pour la voix/toux
        .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
        .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
        .communication_format = i2s_comm_format_t(I2S_COMM_FORMAT_I2S | I2S_COMM_FORMAT_I2S_MSB),
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 4,
        .dma_buf_len = 512,
        .use_apll = false,
        .tx_desc_auto_clear = false,
        .fixed_mclk = 0
    };
    const i2s_pin_config_t pin_config = {
        .bck_io_num = I2S_SCK,
        .ws_io_num = I2S_WS,
        .data_out_num = I2S_PIN_NO_CHANGE,
        .data_in_num = I2S_SD
    };
    esp_err_t err = i2s_driver_install(I2S_PORT, &i2s_config, 0, NULL);
    if (err != ESP_OK) Serial.print("Erreur Driver ");
    err += i2s_set_pin(I2S_PORT, &pin_config);
    if (err == ESP_OK) {
        Serial.println("OK (Pins réservées)");
    } else {
        Serial.println("ERREUR CONFIG I2S");
    }

    Serial.println("--- FIN INITIALISATION. DÉBUT DU MONITORING ---");
    delay(2000);
}

void loop() {
    // Mise à jour rapide pour le MAX30100 (doit être appelé très souvent)
    pox.update();

    // Affichage des autres données toutes les 2 secondes
    if (millis() - tsLastReport > 2000) {
        
        Serial.println("\n--- MESURES EN TEMPS RÉEL ---");

        // 1. LECTURE DHT22 (Ambiance)
        float h = dht.readHumidity();
        float t = dht.readTemperature();
        Serial.print("[DHT22] Temp: "); Serial.print(t); Serial.print("°C | Hum: "); Serial.print(h); Serial.println("%");

        // 2. LECTURE DS18B20 (Corps)
        sensors.requestTemperatures(); 
        float bodyTemp = sensors.getTempCByIndex(0);
        Serial.print("[DS18B20] Temp Corporelle: "); Serial.print(bodyTemp); Serial.println("°C");

        // 3. LECTURE MQ-2 (Gaz/Fumée)
        int gasLevel = analogRead(MQ2_PIN);
        Serial.print("[MQ-2] Niveau Gaz (0-4095): "); Serial.println(gasLevel);
        if(gasLevel > 1000) Serial.println(">>> ALERTE FUMÉE DÉTECTÉE <<<");

        // 4. LECTURE MPU6050 (Mouvement Respiratoire)
        sensors_event_t a, g, temp;
        mpu.getEvent(&a, &g, &temp);
        Serial.print("[MPU6050] Accel Z (Respiration): "); Serial.print(a.acceleration.z); Serial.println(" m/s^2");

        // 5. LECTURE MAX30100 (Moyenne lissée par la lib)
        Serial.print("[MAX30100] BPM: "); Serial.print(pox.getHeartRate());
        Serial.print(" | SpO2: "); Serial.print(pox.getSpO2()); Serial.println("%");

        Serial.println("-----------------------------");
        
        tsLastReport = millis();
    }
}