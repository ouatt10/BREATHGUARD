import json
import time
import random 
import paho.mqtt.client as mqtt

# ==========================================
# CONFIGURATION
# ==========================================
BROKER_ADDRESS = "broker.hivemq.com"
PORT = 1883

# Canaux MQTT
TOPIC_DATA = "breathguard/data"       # Données Capteurs ESP32
TOPIC_FEEDBACK = "breathguard/feedback" # Retour Patient (App Mobile)
TOPIC_ALERT = "breathguard/alert"     # Sortie des alertes

# ==========================================
# 1. SIMULATION API EXTERNE (Météo/Pollen)
# ==========================================
def get_external_env_data():
    """
    Simule un appel à une API comme OpenWeatherMap ou BreezoMeter.
    Dans la version finale, on utilisera 'requests.get(URL)'.
    """
    # Simulation : Index Pollen (0-5) et Qualité Air Extérieur (AQI)
    return {
        "pollen_index": random.randint(0, 5), 
        "ext_pollution": random.choice(["FAIBLE", "MOYENNE", "ÉLEVÉE"])
    }

# ==========================================
# 2. MÉMOIRE DU SYSTÈME
# ==========================================
# Stocke le dernier feedback du patient (valable 15 minutes en théorie)
etat_patient_declare = "RAS" 

# Profil Patient (Statique)
PROFIL = {
    "nom": "Patient Test",
    "seuil_fievre": 38.0,
    "asthme_connu": True
}

# ==========================================
# 3. LE CERVEAU (RÈGLES V4 : AVEC RHUME)
# ==========================================
def diagnostic_expert(payload_esp):
    global etat_patient_declare
    
    try:
        # --- A. ACQUISITION ---
        data = json.loads(payload_esp)
        
        # Données Biométriques (Internes)
        spo2 = data.get("spo2", 0)
        bpm = data.get("bpm", 0)
        body_temp = data.get("body_temp", 0)
        toux = (str(data.get("cough_detected", "false")) == "true")
        
        # Données Environnement (Locales + API)
        gas = data.get("gas", 0)
        hum = data.get("hum", 0)
        env_ext = get_external_env_data() # Appel API simulé
        
        print(f"--- ANALYSE ---")
        print(f"Bio: SpO2={spo2}% | Temp={body_temp}°C | Toux={toux}")
        print(f"Env: Gaz={gas} | Pollen={env_ext['pollen_index']}/5")
        print(f"Feedback Patient: {etat_patient_declare}")

        alertes = []
        niveau = "INFO" # Par défaut

        # --- B. RÈGLES DE DÉCISION ---

        # 1. URGENCE VITALE (Hypoxie)
        if 0 < spo2 < 90:
            alertes.append(f"URGENCE : Hypoxie Sévère ({spo2}%)")
            niveau = "CRITIQUE"

        # 2. DANGER ENVIRONNEMENT (Incendie/Gaz)
        if gas > 1500:
            alertes.append(f"DANGER : Gaz/Fumée détectés (Niveau {gas})")
            niveau = "CRITIQUE"

        # 3. CRISE D'ASTHME (Combinaison Complexe)
        # Déclencheurs : Pollen (API), Gaz (Local), Air Sec
        risque_env = (env_ext['pollen_index'] >= 4) or (gas > 600) or (hum < 30)
        # Symptômes : Toux + Baisse légère SpO2
        symptomes_asthme = toux or (90 <= spo2 <= 94)
        
        if PROFIL["asthme_connu"] and risque_env and symptomes_asthme:
            alertes.append("ALERTE ASTHME : Risque environnemental élevé + Symptômes")
            if niveau != "CRITIQUE": niveau = "HAUT"

        # 4. MALADIE BÉNIGNE (Rhume / Grippe) - NOUVEAU !
        # Logique : Un peu de fièvre + Toux + MAIS SpO2 correcte (donc poumons OK)
        if (37.5 <= body_temp < 39.0) and toux and (spo2 > 95):
            alertes.append("SUSPICION INFECTION VIRALE (Rhume/Grippe)")
            if niveau == "INFO": niveau = "MOYEN"
            
        # 5. FIÈVRE FORTE (Infection grave)
        if body_temp >= 39.0:
            alertes.append(f"FIÈVRE ÉLEVÉE ({body_temp}°C)")
            if niveau == "INFO": niveau = "HAUT"

        # 6. VÉRITÉ TERRAIN (Priorité Absolue)
        if etat_patient_declare == "CRISE_RESSENTIE":
            alertes.append("SIGNALEMENT PATIENT : Ressenti de crise")
            niveau = "HAUT"

        # --- C. RESTITUTION ---
        if alertes:
            msg = " + ".join(alertes)
            return True, niveau, msg
        
        return False, "NORMAL", "Stable"

    except Exception as e:
        print(f"Erreur: {e}")
        return False, "ERR", ""

# ==========================================
# GESTION RESEAU
# ==========================================
def on_message(client, userdata, msg):
    topic = msg.topic
    payload = msg.payload.decode()

    # Si c'est le patient qui appuie sur l'App
    if topic == TOPIC_FEEDBACK:
        global etat_patient_declare
        etat_patient_declare = payload # Ex: "CRISE_RESSENTIE"
        print(f"📢 FEEDBACK REÇU : {etat_patient_declare}")

    # Si ce sont les capteurs
    elif topic == TOPIC_DATA:
        is_alert, niv, message = diagnostic_expert(payload)
        
        if is_alert:
            print(f"🚨 DÉCISION [{niv}] : {message}")
            # Envoi vers l'App du patient
            alert_payload = json.dumps({
                "niveau": niv,
                "message": message,
                "timestamp": time.time()
            })
            client.publish(TOPIC_ALERT, alert_payload)
        else:
            print("✅ RAS")

if __name__ == "__main__":
    print("--- 🏥 DOCTEUR IA V4 (Expertise Complète + Rhume) ---")
    client = mqtt.Client()
    client.on_connect = lambda c, u, f, rc: c.subscribe([(TOPIC_DATA,0), (TOPIC_FEEDBACK,0)])
    client.on_message = on_message
    
    try:
        client.connect(BROKER_ADDRESS, PORT, 60)
        client.loop_forever()
    except:
        print("Arrêt.")