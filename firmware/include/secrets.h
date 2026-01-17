#ifndef SECRETS_H
#define SECRETS_H

// 1. VOS IDENTIFIANTS WI-FI
const char* WIFI_SSID = "M2_RTEL";      // Mettez le nom exact
const char* WIFI_PASSWORD = "M@ster_2024";  // Mettez le mot de passe

// 2. CONFIGURATION MQTT (Le Serveur)
// Pour l'instant, on utilise un serveur de test public (HiveMQ) 
// pour vérifier que ça marche avant de passer à votre serveur privé.
const char* MQTT_SERVER = "broker.hivemq.com"; 
const int MQTT_PORT = 1883;
const char* MQTT_TOPIC_DATA = "breathguard/data"; // Le sujet où on publie
const char* MQTT_TOPIC_ALERT = "breathguard/alert"; // Le sujet pour les crises

#endif