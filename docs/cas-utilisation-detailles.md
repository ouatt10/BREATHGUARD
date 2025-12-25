\# CAS D'UTILISATION DÉTAILLÉS - BREATHGUARD

\## Système Intelligent de Prédiction des Maladies Respiratoires



---



\## IMPORTANT - ARCHITECTURE DU SYSTÈME



\### Capteurs IoT : OPTIONNELS



\*\*Les capteurs IoT sont OPTIONNELS.\*\* L'application fonctionne avec ou sans capteurs connectés.



\### Deux Modes d'Utilisation



\#### \*\*Mode SANS Capteurs\*\*

\- Prédictions basées sur :

&nbsp; - 🌍 \*\*Données environnementales\*\* (APIs externes : météo, AQI, pollen)

&nbsp; - ✍️ \*\*Saisies manuelles\*\* (symptômes déclarés, fréquence des crises)

\- Fonctionnalités disponibles :

&nbsp; - Consultation qualité de l'air

&nbsp; - Cartographie et itinéraires optimisés

&nbsp; - Alertes de pollution

&nbsp; - Recommandations générales



\#### \*\*Mode AVEC Capteurs\*\*

\- Prédictions basées sur :

&nbsp; - 🫀 \*\*Données biométriques\*\* (capteurs internes : SpO2, FR, FC)

&nbsp; - 🏠 \*\*Données environnementales locales\*\* (capteurs externes : CO2, température, humidité)

&nbsp; - 🌍 \*\*Données environnementales régionales\*\* (APIs externes)

&nbsp; - ✍️ \*\*Saisies manuelles\*\* (si nécessaire)

\- Fonctionnalités supplémentaires :

&nbsp; - Suivi biométrique temps réel

&nbsp; - Détection automatique d'anomalies physiologiques

&nbsp; - Prédictions enrichies et personnalisées

&nbsp; - Corrélations environnement/santé automatiques



\### Capteurs Tout-en-Un (pour ceux qui en ont)

Les capteurs BreathGuard collectent \*\*simultanément\*\* :

\- \*\*Données INTERNES (biométriques)\*\* : SpO2, fréquence respiratoire, fréquence cardiaque

\- \*\*Données EXTERNES (environnementales locales)\*\* : Qualité de l'air (CO2, NH3, fumée), température, humidité



\### Maladies Ciblées

\- \*\*Asthme\*\* (prioritaire)

\- \*\*Rhume\*\*



---



\## 1. IDENTIFICATION DES ACTEURS



\### 1.1 Acteurs Humains



\#### \*\*Acteur 1 : Utilisateur\*\*



\*\*Définition\*\* : Toute personne qui utilise BreathGuard pour la prévention et le suivi de sa santé respiratoire. \*\*Peut utiliser l'application avec ou sans capteurs IoT.\*\*



\*\*Caractéristiques communes à TOUS les utilisateurs\*\* :

\- ✅ Consultation de la qualité de l'air (via APIs)

\- ✅ Cartographie environnementale

\- ✅ Alertes de pollution

\- ✅ Recommandations IA (basées sur environnement et/ou biométrique selon équipement)

\- ✅ Planification d'itinéraires optimisés

\- ✅ Consultation de l'historique



\*\*Fonctionnalités supplémentaires SI capteurs connectés\*\* :

\- ✅ Suivi biométrique en temps réel (SpO2, fréquence respiratoire, FC)

\- ✅ Surveillance environnementale locale (CO2, température, humidité de la pièce)

\- ✅ Détection automatique d'anomalies physiologiques

\- ✅ Prédictions enrichies (corrélations biométrique + environnement)

\- ✅ Alertes d'anomalies biométriques



\*\*Motivations\*\* :

\- Prévention des maladies respiratoires (asthme, rhume)

\- Surveillance de la qualité de l'air

\- Anticipation des crises/symptômes

\- Amélioration de la qualité de vie



\*\*Exemples\*\* :



\*Sans capteurs :\*

\- Un parent qui consulte l'AQI avant d'emmener son enfant au parc

\- Un jogger qui vérifie la qualité de l'air avant sa course

\- Une personne sensible qui planifie ses déplacements selon la pollution



\*Avec capteurs :\*

\- Un sportif qui surveille sa SpO2 et sa respiration pendant l'effort

\- Une personne asthmatique qui suit ses paramètres biométriques

\- Un parent qui surveille la qualité de l'air de la chambre de son enfant



---



\#### \*\*Acteur 2 : Patient (spécialisation d'Utilisateur)\*\*



\*\*Définition\*\* : Utilisateur \*\*avec une maladie respiratoire diagnostiquée\*\* (asthme ou rhume chronique) qui bénéficie d'un \*\*suivi médical actif\*\*. \*\*Peut avoir ou non des capteurs connectés.\*\*



\*\*Relation avec Utilisateur\*\* : \*\*Patient EST UN Utilisateur\*\* (héritage)

\- Il possède TOUTES les fonctionnalités de l'Utilisateur de base (avec ou sans capteurs)

\- PLUS des fonctionnalités spécifiques liées à son statut médical



\*\*Caractéristiques supplémentaires\*\* :

\- 🏥 \*\*Suivi médical par un médecin\*\* (lien avec un professionnel de santé)

\- 💊 \*\*Gestion de traitement\*\* : informations sur médicaments, posologie, rappels

\- 📋 \*\*Profil médical détaillé\*\* :

&nbsp; - Diagnostic précis (asthme léger/modéré/sévère, rhume chronique)

&nbsp; - Allergies connues

&nbsp; - Historique de crises

&nbsp; - Déclencheurs identifiés

\- 👨‍⚕️ \*\*Médecin traitant\*\* (coordonnées, accès aux données)

\- 📊 \*\*Dashboard patient enrichi\*\* avec :

&nbsp; - Suivi de traitement (prise de médicaments)

&nbsp; - Journal de symptômes (saisie manuelle si pas de capteurs)

&nbsp; - Plan d'action en cas de crise

&nbsp; - Partage sécurisé des données avec le médecin

&nbsp; - Rapports médicaux automatiques



\*\*Note importante\*\* :

\- Un patient \*\*SANS capteurs\*\* déclare manuellement ses symptômes et crises

\- Un patient \*\*AVEC capteurs\*\* bénéficie d'un suivi automatique plus précis



\*\*Différences visuelles dans l'application\*\* :

\- Badge "Patient" dans le profil

\- Onglet supplémentaire "Mon Traitement"

\- Section "Mon Médecin" avec contact direct

\- Onglet "Journal de Symptômes" (pour saisies manuelles)

\- Boutons d'urgence plus visibles

\- Historique enrichi avec corrélations médicales



\*\*Exemples\*\* :

\- Marie, 35 ans, asthmatique modérée, \*\*avec capteurs\*\*, suivie par pneumologue

\- Lucas, 8 ans, asthme léger, \*\*sans capteurs\*\*, déclare ses symptômes avec aide des parents

\- Sophie, 42 ans, rhume chronique, \*\*avec capteurs\*\*, suivi régulier



---



\#### \*\*Acteur 3 : Médecin\*\*



\*\*Définition\*\* : Professionnel de santé qui suit un ou plusieurs Patients utilisant BreathGuard.



\*\*Caractéristiques\*\* :

\- Compte professionnel distinct

\- Peut superviser plusieurs patients

\- Accès aux données de ses patients (avec autorisation)

\- Interface adaptée pour diagnostic et suivi médical

\- Voit si le patient a des capteurs ou non



\*\*Relations\*\* :

\- Un médecin peut suivre \*\*plusieurs patients\*\*

\- Un patient peut avoir \*\*un ou plusieurs médecins\*\* (généraliste + spécialiste)



\*\*Droits d'accès\*\* :

\- Accès \*\*lecture seule\*\* aux données patient :

&nbsp; - Si capteurs : mesures biométriques automatiques

&nbsp; - Si pas de capteurs : symptômes déclarés manuellement

&nbsp; - Pour tous : alertes, historique, données environnementales

\- Peut ajouter des \*\*notes médicales\*\* au dossier

\- Peut \*\*ajuster les seuils d'alerte\*\* (si patient avec capteurs)

\- Peut \*\*prescrire un plan de traitement\*\* visible dans l'app

\- Reçoit des \*\*alertes\*\* selon gravité



\*\*Exemples\*\* :

\- Dr. Kouassi, pneumologue, suit 50 patients (30 avec capteurs, 20 sans)

\- Dr. Sanogo, médecin généraliste, consulte les déclarations de symptômes



---



\### 1.2 Acteurs Techniques



\#### \*\*Acteur 4 : Système IoT (Capteurs Optionnels)\*\*



\*\*Rôle\*\* : Collecte automatique et transmission des données \*\*biométriques ET environnementales locales\*\* pour les utilisateurs équipés.



\*\*Composants - Capteurs Intégrés\*\* :



\*\*Capteurs INTERNES (Biométriques)\*\* :

\- MAX30102 : SpO2 (saturation en oxygène) et fréquence cardiaque

\- Capteur de fréquence respiratoire



\*\*Capteurs EXTERNES (Environnementaux locaux)\*\* :

\- MQ135 : Qualité de l'air (CO2, NH3, fumée, polluants)

\- DHT22 : Température ambiante et humidité relative



\*\*Microcontrôleur\*\* :

\- ESP32 (WiFi/Bluetooth intégré) : Agrège toutes les mesures et transmet au cloud



\*\*Fonctionnement\*\* :

1\. Mesure \*\*simultanée\*\* de tous les paramètres (internes + externes)

2\. Agrégation des données sur ESP32

3\. Transmission via WiFi/Bluetooth toutes les 5-10 minutes

4\. Signalement des dysfonctionnements



\*\*Format des données transmises\*\* :

```json

{

&nbsp; "timestamp": "2024-12-05T14:30:00Z",

&nbsp; "user\_id": "user\_001",

&nbsp; "has\_sensors": true,

&nbsp; "internal": {

&nbsp;   "spo2": 98,

&nbsp;   "heart\_rate": 72,

&nbsp;   "respiratory\_rate": 16

&nbsp; },

&nbsp; "external\_local": {

&nbsp;   "air\_quality": 45,

&nbsp;   "co2": 420,

&nbsp;   "temperature": 22,

&nbsp;   "humidity": 65

&nbsp; }

}

```



---



\#### \*\*Acteur 5 : Moteur IA\*\*



\*\*Rôle\*\* : Analyse intelligente et génération de prédictions \*\*adaptées au mode d'utilisation\*\* (avec ou sans capteurs).



\*\*Fonctions principales\*\* :



\*\*Pour TOUS (avec ou sans capteurs)\*\* :

1\. \*\*Analyse environnementale\*\* :

&nbsp;  - Données APIs (AQI, météo, pollen)

&nbsp;  - Identification de risques environnementaux

&nbsp;  - Prédictions basées sur conditions extérieures



2\. \*\*Recommandations générales\*\* :

&nbsp;  - Conseils basés sur qualité de l'air

&nbsp;  - Meilleurs moments pour sortir

&nbsp;  - Zones à éviter



\*\*Pour utilisateurs AVEC capteurs (en plus)\*\* :

3\. \*\*Détection d'anomalies biométriques\*\* :

&nbsp;  - Analyse temps réel (SpO2, FR, FC)

&nbsp;  - Identification de patterns anormaux

&nbsp;  - Comparaison avec profil utilisateur



4\. \*\*Corrélation multi-facteurs\*\* :

&nbsp;  - Croisement données internes (SpO2, FR) + externes locales (CO2, humidité) + externes régionales (AQI)

&nbsp;  - Exemple : "SpO2 baisse + CO2 élevé dans la pièce + AQI régional haut = Risque crise d'asthme"



5\. \*\*Prédictions enrichies\*\* :

&nbsp;  - Score de risque personnalisé (0-100)

&nbsp;  - Prévisions de crises basées sur corrélations

&nbsp;  - Détection précoce de symptômes



\*\*Technologies\*\* :

\- Python, TensorFlow, Scikit-Learn

\- Random Forest : Classification des états

\- LSTM : Analyse de séries temporelles



---



\#### \*\*Acteur 6 : APIs Externes\*\*



\*\*Rôle\*\* : Fournir des données environnementales régionales \*\*essentielles pour TOUS les utilisateurs\*\* (avec ou sans capteurs).



\*\*Sources\*\* :

\- \*\*API Météo\*\* (OpenWeatherMap) : Température, humidité, pression, prévisions

\- \*\*API Qualité de l'Air\*\* (AirVisual, OpenAQ) : AQI, polluants, prévisions pollution

\- \*\*API Pollen\*\* (optionnel) : Niveaux de pollen par type

\- \*\*API Cartographie\*\* (Google Maps) : Géolocalisation, itinéraires



\*\*Utilisation\*\* :

\- \*\*Sans capteurs\*\* : APIs = Source principale de données pour prédictions

\- \*\*Avec capteurs\*\* : APIs complètent les données locales pour vue d'ensemble



---



\## 2. CAS D'UTILISATION - UTILISATEUR SANS CAPTEURS



\### CU1 : Créer un Compte sans Capteurs



\*\*Acteur principal\*\* : Nouvel utilisateur  

\*\*Objectif\*\* : Utiliser l'application sans équipement IoT



\*\*Préconditions\*\* :

\- Application installée



\*\*Scénario nominal\*\* :

1\. L'utilisateur ouvre l'application

2\. Il clique "Créer un compte"

3\. Il saisit : email, mot de passe, nom, prénom

4\. Question : "Avez-vous des capteurs BreathGuard ?"

5\. Il sélectionne : \*\*"Non, je veux utiliser sans capteurs"\*\*

6\. Il renseigne (optionnel) :

&nbsp;  - Localisation habituelle

&nbsp;  - Sensibilités connues (pollen, fumée, etc.)

7\. Accepte conditions d'utilisation

8\. Compte créé avec profil "Sans capteurs"



\*\*Postconditions\*\* :

\- Compte actif

\- Mode "Sans capteurs" activé

\- Accès aux fonctionnalités environnementales



---



\### CU2 : Consulter la Qualité de l'Air (sans capteurs)



\*\*Acteur principal\*\* : Utilisateur sans capteurs  

\*\*Objectif\*\* : Connaître l'AQI de sa zone



\*\*Préconditions\*\* :

\- Géolocalisation activée



\*\*Scénario nominal\*\* :

1\. L'utilisateur ouvre l'application

2\. Dashboard affiche :

&nbsp;  - \*\*AQI actuel\*\* : 65 (Modéré) 🟡

&nbsp;  - \*\*Température\*\* : 28°C

&nbsp;  - \*\*Humidité\*\* : 70%

&nbsp;  - \*\*Pollen\*\* : Niveau moyen

3\. Message : "Qualité d'air modérée. Limitez l'exercice intense si vous êtes sensible."

4\. Prévisions : "Amélioration prévue ce soir"



\*\*Postconditions\*\* :

\- Utilisateur informé des conditions environnementales



---



\### CU3 : Recevoir une Alerte de Pollution (sans capteurs)



\*\*Acteur principal\*\* : Utilisateur sans capteurs  

\*\*Acteurs secondaires\*\* : APIs Externes, Moteur IA



\*\*Objectif\*\* : Être prévenu d'une dégradation de l'air



\*\*Préconditions\*\* :

\- Notifications activées



\*\*Scénario nominal\*\* :

1\. APIs signalent pic de pollution (AQI passe à 180)

2\. Moteur IA analyse :

&nbsp;  - Utilisateur dans zone affectée

&nbsp;  - Historique : sensible à la pollution

3\. Génération alerte MODÉRÉE

4\. Notification : "⚠️ Pic de pollution (AQI 180). Évitez les sorties et l'exercice extérieur. Restez à l'intérieur si possible."

5\. Utilisateur ouvre et voit détails + recommandations



\*\*Postconditions\*\* :

\- Utilisateur peut adapter son comportement



---



\### CU4 : Déclarer des Symptômes (sans capteurs)



\*\*Acteur principal\*\* : Utilisateur sans capteurs  

\*\*Objectif\*\* : Enregistrer manuellement ses symptômes



\*\*Préconditions\*\* :

\- Compte actif



\*\*Scénario nominal\*\* :

1\. Utilisateur ressent des symptômes

2\. Il ouvre "Journal de Santé"

3\. Il clique "Déclarer des symptômes"

4\. Il sélectionne :

&nbsp;  - 😮‍💨 Essoufflement : Modéré

&nbsp;  - 🤧 Éternuements : Fréquents

&nbsp;  - 💨 Respiration sifflante : Non

5\. Il ajoute note : "Après promenade au parc"

6\. Enregistrement avec :

&nbsp;  - Timestamp

&nbsp;  - Conditions environnementales au moment (AQI, météo)



\*\*Postconditions\*\* :

\- Symptômes enregistrés

\- IA peut identifier patterns avec environnement

\- Disponible dans historique



---



\### CU5 : Obtenir des Recommandations (sans capteurs)



\*\*Acteur principal\*\* : Utilisateur sans capteurs  

\*\*Acteur secondaire\*\* : Moteur IA



\*\*Objectif\*\* : Recevoir des conseils basés sur environnement



\*\*Préconditions\*\* :

\- Historique de symptômes déclarés



\*\*Scénario nominal\*\* :

1\. Chaque matin 7h00, IA analyse :

&nbsp;  - Prévisions AQI : 140 (mauvais) l'après-midi

&nbsp;  - Historique utilisateur : 3 symptômes déclarés lors AQI > 130

&nbsp;  - Pollen : Niveau élevé

2\. Génération recommandation :

&nbsp;  "☀️ Bonjour !

&nbsp;  

&nbsp;  ⚠️ Attention aujourd'hui :

&nbsp;  - Qualité d'air mauvaise prévue (AQI 140) entre 14h-17h

&nbsp;  - Niveau de pollen élevé

&nbsp;  

&nbsp;  📋 Recommandations :

&nbsp;  - Restez à l'intérieur pendant l'après-midi

&nbsp;  - Fermez les fenêtres

&nbsp;  - Si vous devez sortir, portez un masque

&nbsp;  - Surveillez vos symptômes"



3\. Notification envoyée



\*\*Postconditions\*\* :

\- Utilisateur informé et peut se préparer



---



\## 3. CAS D'UTILISATION - UTILISATEUR AVEC CAPTEURS



\### CU6 : Connecter les Capteurs IoT



\*\*Acteur principal\*\* : Utilisateur  

\*\*Objectif\*\* : Passer en mode "Avec capteurs"



\*\*Préconditions\*\* :

\- Compte existant

\- Capteurs BreathGuard en possession



\*\*Scénario nominal\*\* :

1\. Utilisateur allume le boîtier de capteurs

2\. Il va dans "Paramètres > Mes Capteurs"

3\. Il clique "Connecter mes capteurs"

4\. Choix mode : Bluetooth

5\. Scan des appareils

6\. Sélection "BreathGuard\_Device\_001"

7\. Appairage automatique

8\. Test :

&nbsp;  - ✅ Capteurs biométriques : OK

&nbsp;  - ✅ Capteurs environnementaux : OK

9\. Message : "✅ Capteurs connectés ! Vous bénéficiez maintenant du suivi biométrique complet."

10\. Mode "Avec capteurs" activé



\*\*Postconditions\*\* :

\- Capteurs fonctionnels

\- Nouvelles fonctionnalités débloquées

\- Collecte automatique activée



---



\### CU7 : Visualiser les Données Complètes (avec capteurs)



\*\*Acteur principal\*\* : Utilisateur avec capteurs  

\*\*Objectif\*\* : Consulter données biométriques + environnementales



\*\*Préconditions\*\* :

\- Capteurs connectés



\*\*Scénario nominal\*\* :

1\. Utilisateur ouvre "Données"

2\. Il voit trois sections :



\*\*BIOMÉTRIQUE (capteurs internes)\*\* :

\- SpO2 : 98% ✅

\- Fréquence respiratoire : 16/min ✅

\- Fréquence cardiaque : 72 bpm ✅



\*\*ENVIRONNEMENT LOCAL (capteurs externes)\*\* :

\- CO2 : 420 ppm ✅

\- Température : 22°C

\- Humidité : 65%



\*\*ENVIRONNEMENT RÉGIONAL (APIs)\*\* :

\- AQI : 50 (Bon) ✅

\- Pollen : Faible

\- Météo : Ensoleillé



3\. Timestamp : "Mis à jour il y a 2 min"

4\. Tendances affichées



\*\*Postconditions\*\* :

\- Vue complète interne + externe



---



\### CU8 : Recevoir une Alerte Biométrique (avec capteurs)



\*\*Acteur principal\*\* : Utilisateur avec capteurs  

\*\*Acteurs secondaires\*\* : Système IoT, Moteur IA



\*\*Objectif\*\* : Être alerté d'une anomalie physiologique



\*\*Préconditions\*\* :

\- Capteurs connectés



\*\*Scénario nominal\*\* :

1\. Capteurs mesurent :

&nbsp;  - SpO2 : 88% (baisse)

&nbsp;  - CO2 local : 1100 ppm (élevé)

2\. IA analyse corrélation :

&nbsp;  - SpO2 < 90% (anormal)

&nbsp;  - CO2 > 1000 ppm (mauvaise ventilation)

&nbsp;  - AQI régional : 140 (mauvais)

&nbsp;  - \*\*Triple risque identifié\*\*

3\. Alerte CRITIQUE générée

4\. Notification : "🚨 ALERTE : SpO2 bas (88%) + Air mal ventilé + Pollution extérieure. Ouvrez les fenêtres, asseyez-vous, respirez calmement. Si ça persiste, contactez un médecin."

5\. Utilisateur ouvre et voit :

&nbsp;  - Graphiques des 3 paramètres

&nbsp;  - Corrélations expliquées

&nbsp;  - Boutons d'action



\*\*Postconditions\*\* :

\- Utilisateur alerté avec contexte complet

\- Peut agir rapidement



---



\### CU9 : Voir les Corrélations Automatiques (avec capteurs)



\*\*Acteur principal\*\* : Utilisateur avec capteurs  

\*\*Objectif\*\* : Comprendre les liens santé/environnement



\*\*Préconditions\*\* :

\- Historique > 7 jours avec capteurs



\*\*Scénario nominal\*\* :

1\. Utilisateur ouvre "Analyses > Corrélations"

2\. IA affiche patterns identifiés :

&nbsp;  

&nbsp;  \*\*Pattern 1\*\* :

&nbsp;  - "3 baisses de SpO2 corrélées à CO2 > 900 ppm"

&nbsp;  - Conclusion : "Mauvaise ventilation affecte votre respiration"

&nbsp;  - Conseil : "Aérez régulièrement votre logement"

&nbsp;  

&nbsp;  \*\*Pattern 2\*\* :

&nbsp;  - "Fréquence respiratoire élevée lors AQI > 120"

&nbsp;  - Conclusion : "Pollution extérieure vous affecte"

&nbsp;  - Conseil : "Restez à l'intérieur lors pics de pollution"



3\. Graphiques de corrélation affichés



\*\*Postconditions\*\* :

\- Utilisateur comprend ses déclencheurs personnels



---



\## 4. CAS D'UTILISATION - PATIENT



\### CU10 : Activer le Mode Patient



\*\*Acteur principal\*\* : Utilisateur (avec ou sans capteurs)  

\*\*Objectif\*\* : Bénéficier du suivi médical



\*\*Scénario nominal\*\* :

1\. Utilisateur va dans "Profil > Devenir Patient"

2\. Il renseigne :

&nbsp;  - Diagnostic : Asthme modéré / Rhume chronique

&nbsp;  - Sévérité

&nbsp;  - Allergies

&nbsp;  - Médicaments

&nbsp;  - Médecin traitant

3\. Validation

4\. Badge "Patient" ajouté

5\. Nouvelles fonctionnalités :

&nbsp;  - Onglet "Mon Traitement"

&nbsp;  - Section "Mon Médecin"

&nbsp;  - Journal de Symptômes enrichi

&nbsp;  - Si capteurs : Seuils personnalisés

&nbsp;  - Si pas de capteurs : Rappels de saisie



\*\*Postconditions\*\* :

\- Mode Patient activé

\- Médecin peut accéder aux données



---



\### CU11 : Gérer son Traitement (Patient)



\*\*Acteur principal\*\* : Patient  

\*\*Objectif\*\* : Suivre ses médicaments



\*\*Scénario nominal\*\* :

1\. Patient ouvre "Mon Traitement"

2\. Voit médicaments et prochaines prises

3\. Reçoit rappel : "💊 Prenez votre corticoïde"

4\. Clique "Pris" ou "Reporter"

5\. Historique d'observance mis à jour



\*\*Postconditions\*\* :

\- Suivi de traitement

\- Visible par le médecin



---



\### CU12 : Partager avec son Médecin (Patient)



\*\*Acteur principal\*\* : Patient  

\*\*Objectif\*\* : Transmettre rapport au médecin



\*\*Scénario nominal\*\* :

1\. Patient clique "Générer rapport"

2\. Système crée PDF avec :

&nbsp;  - \*\*Si capteurs\*\* : Données biométriques automatiques

&nbsp;  - \*\*Si pas capteurs\*\* : Symptômes déclarés manuellement

&nbsp;  - Pour tous : Environnement, alertes, corrélations, observance traitement

3\. Envoi par email au médecin

4\. Confirmation



\*\*Postconditions\*\* :

\- Médecin informé avec données disponibles



---



\## 5. RÈGLES DE GESTION



\### RG1 : Capteurs Optionnels

Les capteurs IoT sont \*\*OPTIONNELS\*\*. L'application fonctionne avec ou sans capteurs.



\### RG2 : Modes d'Utilisation

\- \*\*Sans capteurs\*\* : Prédictions basées sur environnement (APIs) + saisies manuelles

\- \*\*Avec capteurs\*\* : Prédictions enrichies avec données biométriques + environnement local + environnement régional



\### RG3 : Distinction Utilisateur vs Patient

\- \*\*Utilisateur\*\* : Utilisation standard (avec ou sans capteurs)

\- \*\*Patient\*\* : Utilisateur + Suivi médical + Traitement + Partage médecin (avec ou sans capteurs)



\### RG4 : Maladies Ciblées

\- \*\*Asthme\*\* (prioritaire)

\- \*\*Rhume\*\*



\### RG5 : Données APIs Essentielles

Les APIs externes sont \*\*essentielles\*\* pour tous les utilisateurs, particulièrement ceux sans capteurs.



\### RG6 : Seuils d'Alerte

\*\*Pour utilisateurs avec capteurs\*\* :

\- SpO2 critique : < 90%

\- CO2 critique : > 1000 ppm



\*\*Pour tous\*\* :

\- AQI critique : > 150



\### RG7 : Saisies Manuelles

Les utilisateurs \*\*sans capteurs\*\* peuvent déclarer leurs symptômes pour alimenter l'IA.



\### RG8 : Prédictions Adaptatives

L'IA adapte ses prédictions selon le mode (avec ou sans capteurs).



---



\*\*Document corrigé le 05/12/2024 pour BreathGuard E-Santé 4.0\*\*# CAS D'UTILISATION DÉTAILLÉS - BREATHGUARD

\## Système Intelligent de Prédiction des Maladies Respiratoires



---



\## IMPORTANT - ARCHITECTURE DU SYSTÈME



\### Capteurs IoT : OPTIONNELS



\*\*Les capteurs IoT sont OPTIONNELS.\*\* L'application fonctionne avec ou sans capteurs connectés.



\### Deux Modes d'Utilisation



\#### \*\*Mode SANS Capteurs\*\*

\- Prédictions basées sur :

&nbsp; - 🌍 \*\*Données environnementales\*\* (APIs externes : météo, AQI, pollen)

&nbsp; - ✍️ \*\*Saisies manuelles\*\* (symptômes déclarés, fréquence des crises)

\- Fonctionnalités disponibles :

&nbsp; - Consultation qualité de l'air

&nbsp; - Cartographie et itinéraires optimisés

&nbsp; - Alertes de pollution

&nbsp; - Recommandations générales



\#### \*\*Mode AVEC Capteurs\*\*

\- Prédictions basées sur :

&nbsp; - 🫀 \*\*Données biométriques\*\* (capteurs internes : SpO2, FR, FC)

&nbsp; - 🏠 \*\*Données environnementales locales\*\* (capteurs externes : CO2, température, humidité)

&nbsp; - 🌍 \*\*Données environnementales régionales\*\* (APIs externes)

&nbsp; - ✍️ \*\*Saisies manuelles\*\* (si nécessaire)

\- Fonctionnalités supplémentaires :

&nbsp; - Suivi biométrique temps réel

&nbsp; - Détection automatique d'anomalies physiologiques

&nbsp; - Prédictions enrichies et personnalisées

&nbsp; - Corrélations environnement/santé automatiques



\### Capteurs Tout-en-Un (pour ceux qui en ont)

Les capteurs BreathGuard collectent \*\*simultanément\*\* :

\- \*\*Données INTERNES (biométriques)\*\* : SpO2, fréquence respiratoire, fréquence cardiaque

\- \*\*Données EXTERNES (environnementales locales)\*\* : Qualité de l'air (CO2, NH3, fumée), température, humidité



\### Maladies Ciblées

\- \*\*Asthme\*\* (prioritaire)

\- \*\*Rhume\*\*



---



\## 1. IDENTIFICATION DES ACTEURS



\### 1.1 Acteurs Humains



\#### \*\*Acteur 1 : Utilisateur\*\*



\*\*Définition\*\* : Toute personne qui utilise BreathGuard pour la prévention et le suivi de sa santé respiratoire. \*\*Peut utiliser l'application avec ou sans capteurs IoT.\*\*



\*\*Caractéristiques communes à TOUS les utilisateurs\*\* :

\- ✅ Consultation de la qualité de l'air (via APIs)

\- ✅ Cartographie environnementale

\- ✅ Alertes de pollution

\- ✅ Recommandations IA (basées sur environnement et/ou biométrique selon équipement)

\- ✅ Planification d'itinéraires optimisés

\- ✅ Consultation de l'historique



\*\*Fonctionnalités supplémentaires SI capteurs connectés\*\* :

\- ✅ Suivi biométrique en temps réel (SpO2, fréquence respiratoire, FC)

\- ✅ Surveillance environnementale locale (CO2, température, humidité de la pièce)

\- ✅ Détection automatique d'anomalies physiologiques

\- ✅ Prédictions enrichies (corrélations biométrique + environnement)

\- ✅ Alertes d'anomalies biométriques



\*\*Motivations\*\* :

\- Prévention des maladies respiratoires (asthme, rhume)

\- Surveillance de la qualité de l'air

\- Anticipation des crises/symptômes

\- Amélioration de la qualité de vie



\*\*Exemples\*\* :



\*Sans capteurs :\*

\- Un parent qui consulte l'AQI avant d'emmener son enfant au parc

\- Un jogger qui vérifie la qualité de l'air avant sa course

\- Une personne sensible qui planifie ses déplacements selon la pollution



\*Avec capteurs :\*

\- Un sportif qui surveille sa SpO2 et sa respiration pendant l'effort

\- Une personne asthmatique qui suit ses paramètres biométriques

\- Un parent qui surveille la qualité de l'air de la chambre de son enfant



---



\#### \*\*Acteur 2 : Patient (spécialisation d'Utilisateur)\*\*



\*\*Définition\*\* : Utilisateur \*\*avec une maladie respiratoire diagnostiquée\*\* (asthme ou rhume chronique) qui bénéficie d'un \*\*suivi médical actif\*\*. \*\*Peut avoir ou non des capteurs connectés.\*\*



\*\*Relation avec Utilisateur\*\* : \*\*Patient EST UN Utilisateur\*\* (héritage)

\- Il possède TOUTES les fonctionnalités de l'Utilisateur de base (avec ou sans capteurs)

\- PLUS des fonctionnalités spécifiques liées à son statut médical



\*\*Caractéristiques supplémentaires\*\* :

\- 🏥 \*\*Suivi médical par un médecin\*\* (lien avec un professionnel de santé)

\- 💊 \*\*Gestion de traitement\*\* : informations sur médicaments, posologie, rappels

\- 📋 \*\*Profil médical détaillé\*\* :

&nbsp; - Diagnostic précis (asthme léger/modéré/sévère, rhume chronique)

&nbsp; - Allergies connues

&nbsp; - Historique de crises

&nbsp; - Déclencheurs identifiés

\- 👨‍⚕️ \*\*Médecin traitant\*\* (coordonnées, accès aux données)

\- 📊 \*\*Dashboard patient enrichi\*\* avec :

&nbsp; - Suivi de traitement (prise de médicaments)

&nbsp; - Journal de symptômes (saisie manuelle si pas de capteurs)

&nbsp; - Plan d'action en cas de crise

&nbsp; - Partage sécurisé des données avec le médecin

&nbsp; - Rapports médicaux automatiques



\*\*Note importante\*\* :

\- Un patient \*\*SANS capteurs\*\* déclare manuellement ses symptômes et crises

\- Un patient \*\*AVEC capteurs\*\* bénéficie d'un suivi automatique plus précis



\*\*Différences visuelles dans l'application\*\* :

\- Badge "Patient" dans le profil

\- Onglet supplémentaire "Mon Traitement"

\- Section "Mon Médecin" avec contact direct

\- Onglet "Journal de Symptômes" (pour saisies manuelles)

\- Boutons d'urgence plus visibles

\- Historique enrichi avec corrélations médicales



\*\*Exemples\*\* :

\- Marie, 35 ans, asthmatique modérée, \*\*avec capteurs\*\*, suivie par pneumologue

\- Lucas, 8 ans, asthme léger, \*\*sans capteurs\*\*, déclare ses symptômes avec aide des parents

\- Sophie, 42 ans, rhume chronique, \*\*avec capteurs\*\*, suivi régulier



---



\#### \*\*Acteur 3 : Médecin\*\*



\*\*Définition\*\* : Professionnel de santé qui suit un ou plusieurs Patients utilisant BreathGuard.



\*\*Caractéristiques\*\* :

\- Compte professionnel distinct

\- Peut superviser plusieurs patients

\- Accès aux données de ses patients (avec autorisation)

\- Interface adaptée pour diagnostic et suivi médical

\- Voit si le patient a des capteurs ou non



\*\*Relations\*\* :

\- Un médecin peut suivre \*\*plusieurs patients\*\*

\- Un patient peut avoir \*\*un ou plusieurs médecins\*\* (généraliste + spécialiste)



\*\*Droits d'accès\*\* :

\- Accès \*\*lecture seule\*\* aux données patient :

&nbsp; - Si capteurs : mesures biométriques automatiques

&nbsp; - Si pas de capteurs : symptômes déclarés manuellement

&nbsp; - Pour tous : alertes, historique, données environnementales

\- Peut ajouter des \*\*notes médicales\*\* au dossier

\- Peut \*\*ajuster les seuils d'alerte\*\* (si patient avec capteurs)

\- Peut \*\*prescrire un plan de traitement\*\* visible dans l'app

\- Reçoit des \*\*alertes\*\* selon gravité



\*\*Exemples\*\* :

\- Dr. Kouassi, pneumologue, suit 50 patients (30 avec capteurs, 20 sans)

\- Dr. Sanogo, médecin généraliste, consulte les déclarations de symptômes



---



\### 1.2 Acteurs Techniques



\#### \*\*Acteur 4 : Système IoT (Capteurs Optionnels)\*\*



\*\*Rôle\*\* : Collecte automatique et transmission des données \*\*biométriques ET environnementales locales\*\* pour les utilisateurs équipés.



\*\*Composants - Capteurs Intégrés\*\* :



\*\*Capteurs INTERNES (Biométriques)\*\* :

\- MAX30102 : SpO2 (saturation en oxygène) et fréquence cardiaque

\- Capteur de fréquence respiratoire



\*\*Capteurs EXTERNES (Environnementaux locaux)\*\* :

\- MQ135 : Qualité de l'air (CO2, NH3, fumée, polluants)

\- DHT22 : Température ambiante et humidité relative



\*\*Microcontrôleur\*\* :

\- ESP32 (WiFi/Bluetooth intégré) : Agrège toutes les mesures et transmet au cloud



\*\*Fonctionnement\*\* :

1\. Mesure \*\*simultanée\*\* de tous les paramètres (internes + externes)

2\. Agrégation des données sur ESP32

3\. Transmission via WiFi/Bluetooth toutes les 5-10 minutes

4\. Signalement des dysfonctionnements



\*\*Format des données transmises\*\* :

```json

{

&nbsp; "timestamp": "2024-12-05T14:30:00Z",

&nbsp; "user\_id": "user\_001",

&nbsp; "has\_sensors": true,

&nbsp; "internal": {

&nbsp;   "spo2": 98,

&nbsp;   "heart\_rate": 72,

&nbsp;   "respiratory\_rate": 16

&nbsp; },

&nbsp; "external\_local": {

&nbsp;   "air\_quality": 45,

&nbsp;   "co2": 420,

&nbsp;   "temperature": 22,

&nbsp;   "humidity": 65

&nbsp; }

}

```



---



\#### \*\*Acteur 5 : Moteur IA\*\*



\*\*Rôle\*\* : Analyse intelligente et génération de prédictions \*\*adaptées au mode d'utilisation\*\* (avec ou sans capteurs).



\*\*Fonctions principales\*\* :



\*\*Pour TOUS (avec ou sans capteurs)\*\* :

1\. \*\*Analyse environnementale\*\* :

&nbsp;  - Données APIs (AQI, météo, pollen)

&nbsp;  - Identification de risques environnementaux

&nbsp;  - Prédictions basées sur conditions extérieures



2\. \*\*Recommandations générales\*\* :

&nbsp;  - Conseils basés sur qualité de l'air

&nbsp;  - Meilleurs moments pour sortir

&nbsp;  - Zones à éviter



\*\*Pour utilisateurs AVEC capteurs (en plus)\*\* :

3\. \*\*Détection d'anomalies biométriques\*\* :

&nbsp;  - Analyse temps réel (SpO2, FR, FC)

&nbsp;  - Identification de patterns anormaux

&nbsp;  - Comparaison avec profil utilisateur



4\. \*\*Corrélation multi-facteurs\*\* :

&nbsp;  - Croisement données internes (SpO2, FR) + externes locales (CO2, humidité) + externes régionales (AQI)

&nbsp;  - Exemple : "SpO2 baisse + CO2 élevé dans la pièce + AQI régional haut = Risque crise d'asthme"



5\. \*\*Prédictions enrichies\*\* :

&nbsp;  - Score de risque personnalisé (0-100)

&nbsp;  - Prévisions de crises basées sur corrélations

&nbsp;  - Détection précoce de symptômes



\*\*Technologies\*\* :

\- Python, TensorFlow, Scikit-Learn

\- Random Forest : Classification des états

\- LSTM : Analyse de séries temporelles



---



\#### \*\*Acteur 6 : APIs Externes\*\*



\*\*Rôle\*\* : Fournir des données environnementales régionales \*\*essentielles pour TOUS les utilisateurs\*\* (avec ou sans capteurs).



\*\*Sources\*\* :

\- \*\*API Météo\*\* (OpenWeatherMap) : Température, humidité, pression, prévisions

\- \*\*API Qualité de l'Air\*\* (AirVisual, OpenAQ) : AQI, polluants, prévisions pollution

\- \*\*API Pollen\*\* (optionnel) : Niveaux de pollen par type

\- \*\*API Cartographie\*\* (Google Maps) : Géolocalisation, itinéraires



\*\*Utilisation\*\* :

\- \*\*Sans capteurs\*\* : APIs = Source principale de données pour prédictions

\- \*\*Avec capteurs\*\* : APIs complètent les données locales pour vue d'ensemble



---



\## 2. CAS D'UTILISATION - UTILISATEUR SANS CAPTEURS



\### CU1 : Créer un Compte sans Capteurs



\*\*Acteur principal\*\* : Nouvel utilisateur  

\*\*Objectif\*\* : Utiliser l'application sans équipement IoT



\*\*Préconditions\*\* :

\- Application installée



\*\*Scénario nominal\*\* :

1\. L'utilisateur ouvre l'application

2\. Il clique "Créer un compte"

3\. Il saisit : email, mot de passe, nom, prénom

4\. Question : "Avez-vous des capteurs BreathGuard ?"

5\. Il sélectionne : \*\*"Non, je veux utiliser sans capteurs"\*\*

6\. Il renseigne (optionnel) :

&nbsp;  - Localisation habituelle

&nbsp;  - Sensibilités connues (pollen, fumée, etc.)

7\. Accepte conditions d'utilisation

8\. Compte créé avec profil "Sans capteurs"



\*\*Postconditions\*\* :

\- Compte actif

\- Mode "Sans capteurs" activé

\- Accès aux fonctionnalités environnementales



---



\### CU2 : Consulter la Qualité de l'Air (sans capteurs)



\*\*Acteur principal\*\* : Utilisateur sans capteurs  

\*\*Objectif\*\* : Connaître l'AQI de sa zone



\*\*Préconditions\*\* :

\- Géolocalisation activée



\*\*Scénario nominal\*\* :

1\. L'utilisateur ouvre l'application

2\. Dashboard affiche :

&nbsp;  - \*\*AQI actuel\*\* : 65 (Modéré) 🟡

&nbsp;  - \*\*Température\*\* : 28°C

&nbsp;  - \*\*Humidité\*\* : 70%

&nbsp;  - \*\*Pollen\*\* : Niveau moyen

3\. Message : "Qualité d'air modérée. Limitez l'exercice intense si vous êtes sensible."

4\. Prévisions : "Amélioration prévue ce soir"



\*\*Postconditions\*\* :

\- Utilisateur informé des conditions environnementales



---



\### CU3 : Recevoir une Alerte de Pollution (sans capteurs)



\*\*Acteur principal\*\* : Utilisateur sans capteurs  

\*\*Acteurs secondaires\*\* : APIs Externes, Moteur IA



\*\*Objectif\*\* : Être prévenu d'une dégradation de l'air



\*\*Préconditions\*\* :

\- Notifications activées



\*\*Scénario nominal\*\* :

1\. APIs signalent pic de pollution (AQI passe à 180)

2\. Moteur IA analyse :

&nbsp;  - Utilisateur dans zone affectée

&nbsp;  - Historique : sensible à la pollution

3\. Génération alerte MODÉRÉE

4\. Notification : "⚠️ Pic de pollution (AQI 180). Évitez les sorties et l'exercice extérieur. Restez à l'intérieur si possible."

5\. Utilisateur ouvre et voit détails + recommandations



\*\*Postconditions\*\* :

\- Utilisateur peut adapter son comportement



---



\### CU4 : Déclarer des Symptômes (sans capteurs)



\*\*Acteur principal\*\* : Utilisateur sans capteurs  

\*\*Objectif\*\* : Enregistrer manuellement ses symptômes



\*\*Préconditions\*\* :

\- Compte actif



\*\*Scénario nominal\*\* :

1\. Utilisateur ressent des symptômes

2\. Il ouvre "Journal de Santé"

3\. Il clique "Déclarer des symptômes"

4\. Il sélectionne :

&nbsp;  - 😮‍💨 Essoufflement : Modéré

&nbsp;  - 🤧 Éternuements : Fréquents

&nbsp;  - 💨 Respiration sifflante : Non

5\. Il ajoute note : "Après promenade au parc"

6\. Enregistrement avec :

&nbsp;  - Timestamp

&nbsp;  - Conditions environnementales au moment (AQI, météo)



\*\*Postconditions\*\* :

\- Symptômes enregistrés

\- IA peut identifier patterns avec environnement

\- Disponible dans historique



---



\### CU5 : Obtenir des Recommandations (sans capteurs)



\*\*Acteur principal\*\* : Utilisateur sans capteurs  

\*\*Acteur secondaire\*\* : Moteur IA



\*\*Objectif\*\* : Recevoir des conseils basés sur environnement



\*\*Préconditions\*\* :

\- Historique de symptômes déclarés



\*\*Scénario nominal\*\* :

1\. Chaque matin 7h00, IA analyse :

&nbsp;  - Prévisions AQI : 140 (mauvais) l'après-midi

&nbsp;  - Historique utilisateur : 3 symptômes déclarés lors AQI > 130

&nbsp;  - Pollen : Niveau élevé

2\. Génération recommandation :

&nbsp;  "☀️ Bonjour !

&nbsp;  

&nbsp;  ⚠️ Attention aujourd'hui :

&nbsp;  - Qualité d'air mauvaise prévue (AQI 140) entre 14h-17h

&nbsp;  - Niveau de pollen élevé

&nbsp;  

&nbsp;  📋 Recommandations :

&nbsp;  - Restez à l'intérieur pendant l'après-midi

&nbsp;  - Fermez les fenêtres

&nbsp;  - Si vous devez sortir, portez un masque

&nbsp;  - Surveillez vos symptômes"



3\. Notification envoyée



\*\*Postconditions\*\* :

\- Utilisateur informé et peut se préparer



---



\## 3. CAS D'UTILISATION - UTILISATEUR AVEC CAPTEURS



\### CU6 : Connecter les Capteurs IoT



\*\*Acteur principal\*\* : Utilisateur  

\*\*Objectif\*\* : Passer en mode "Avec capteurs"



\*\*Préconditions\*\* :

\- Compte existant

\- Capteurs BreathGuard en possession



\*\*Scénario nominal\*\* :

1\. Utilisateur allume le boîtier de capteurs

2\. Il va dans "Paramètres > Mes Capteurs"

3\. Il clique "Connecter mes capteurs"

4\. Choix mode : Bluetooth

5\. Scan des appareils

6\. Sélection "BreathGuard\_Device\_001"

7\. Appairage automatique

8\. Test :

&nbsp;  - ✅ Capteurs biométriques : OK

&nbsp;  - ✅ Capteurs environnementaux : OK

9\. Message : "✅ Capteurs connectés ! Vous bénéficiez maintenant du suivi biométrique complet."

10\. Mode "Avec capteurs" activé



\*\*Postconditions\*\* :

\- Capteurs fonctionnels

\- Nouvelles fonctionnalités débloquées

\- Collecte automatique activée



---



\### CU7 : Visualiser les Données Complètes (avec capteurs)



\*\*Acteur principal\*\* : Utilisateur avec capteurs  

\*\*Objectif\*\* : Consulter données biométriques + environnementales



\*\*Préconditions\*\* :

\- Capteurs connectés



\*\*Scénario nominal\*\* :

1\. Utilisateur ouvre "Données"

2\. Il voit trois sections :



\*\*BIOMÉTRIQUE (capteurs internes)\*\* :

\- SpO2 : 98% ✅

\- Fréquence respiratoire : 16/min ✅

\- Fréquence cardiaque : 72 bpm ✅



\*\*ENVIRONNEMENT LOCAL (capteurs externes)\*\* :

\- CO2 : 420 ppm ✅

\- Température : 22°C

\- Humidité : 65%



\*\*ENVIRONNEMENT RÉGIONAL (APIs)\*\* :

\- AQI : 50 (Bon) ✅

\- Pollen : Faible

\- Météo : Ensoleillé



3\. Timestamp : "Mis à jour il y a 2 min"

4\. Tendances affichées



\*\*Postconditions\*\* :

\- Vue complète interne + externe



---



\### CU8 : Recevoir une Alerte Biométrique (avec capteurs)



\*\*Acteur principal\*\* : Utilisateur avec capteurs  

\*\*Acteurs secondaires\*\* : Système IoT, Moteur IA



\*\*Objectif\*\* : Être alerté d'une anomalie physiologique



\*\*Préconditions\*\* :

\- Capteurs connectés



\*\*Scénario nominal\*\* :

1\. Capteurs mesurent :

&nbsp;  - SpO2 : 88% (baisse)

&nbsp;  - CO2 local : 1100 ppm (élevé)

2\. IA analyse corrélation :

&nbsp;  - SpO2 < 90% (anormal)

&nbsp;  - CO2 > 1000 ppm (mauvaise ventilation)

&nbsp;  - AQI régional : 140 (mauvais)

&nbsp;  - \*\*Triple risque identifié\*\*

3\. Alerte CRITIQUE générée

4\. Notification : "🚨 ALERTE : SpO2 bas (88%) + Air mal ventilé + Pollution extérieure. Ouvrez les fenêtres, asseyez-vous, respirez calmement. Si ça persiste, contactez un médecin."

5\. Utilisateur ouvre et voit :

&nbsp;  - Graphiques des 3 paramètres

&nbsp;  - Corrélations expliquées

&nbsp;  - Boutons d'action



\*\*Postconditions\*\* :

\- Utilisateur alerté avec contexte complet

\- Peut agir rapidement



---



\### CU9 : Voir les Corrélations Automatiques (avec capteurs)



\*\*Acteur principal\*\* : Utilisateur avec capteurs  

\*\*Objectif\*\* : Comprendre les liens santé/environnement



\*\*Préconditions\*\* :

\- Historique > 7 jours avec capteurs



\*\*Scénario nominal\*\* :

1\. Utilisateur ouvre "Analyses > Corrélations"

2\. IA affiche patterns identifiés :

&nbsp;  

&nbsp;  \*\*Pattern 1\*\* :

&nbsp;  - "3 baisses de SpO2 corrélées à CO2 > 900 ppm"

&nbsp;  - Conclusion : "Mauvaise ventilation affecte votre respiration"

&nbsp;  - Conseil : "Aérez régulièrement votre logement"

&nbsp;  

&nbsp;  \*\*Pattern 2\*\* :

&nbsp;  - "Fréquence respiratoire élevée lors AQI > 120"

&nbsp;  - Conclusion : "Pollution extérieure vous affecte"

&nbsp;  - Conseil : "Restez à l'intérieur lors pics de pollution"



3\. Graphiques de corrélation affichés



\*\*Postconditions\*\* :

\- Utilisateur comprend ses déclencheurs personnels



---



\## 4. CAS D'UTILISATION - PATIENT



\### CU10 : Activer le Mode Patient



\*\*Acteur principal\*\* : Utilisateur (avec ou sans capteurs)  

\*\*Objectif\*\* : Bénéficier du suivi médical



\*\*Scénario nominal\*\* :

1\. Utilisateur va dans "Profil > Devenir Patient"

2\. Il renseigne :

&nbsp;  - Diagnostic : Asthme modéré / Rhume chronique

&nbsp;  - Sévérité

&nbsp;  - Allergies

&nbsp;  - Médicaments

&nbsp;  - Médecin traitant

3\. Validation

4\. Badge "Patient" ajouté

5\. Nouvelles fonctionnalités :

&nbsp;  - Onglet "Mon Traitement"

&nbsp;  - Section "Mon Médecin"

&nbsp;  - Journal de Symptômes enrichi

&nbsp;  - Si capteurs : Seuils personnalisés

&nbsp;  - Si pas de capteurs : Rappels de saisie



\*\*Postconditions\*\* :

\- Mode Patient activé

\- Médecin peut accéder aux données



---



\### CU11 : Gérer son Traitement (Patient)



\*\*Acteur principal\*\* : Patient  

\*\*Objectif\*\* : Suivre ses médicaments



\*\*Scénario nominal\*\* :

1\. Patient ouvre "Mon Traitement"

2\. Voit médicaments et prochaines prises

3\. Reçoit rappel : "💊 Prenez votre corticoïde"

4\. Clique "Pris" ou "Reporter"

5\. Historique d'observance mis à jour



\*\*Postconditions\*\* :

\- Suivi de traitement

\- Visible par le médecin



---



\### CU12 : Partager avec son Médecin (Patient)



\*\*Acteur principal\*\* : Patient  

\*\*Objectif\*\* : Transmettre rapport au médecin



\*\*Scénario nominal\*\* :

1\. Patient clique "Générer rapport"

2\. Système crée PDF avec :

&nbsp;  - \*\*Si capteurs\*\* : Données biométriques automatiques

&nbsp;  - \*\*Si pas capteurs\*\* : Symptômes déclarés manuellement

&nbsp;  - Pour tous : Environnement, alertes, corrélations, observance traitement

3\. Envoi par email au médecin

4\. Confirmation



\*\*Postconditions\*\* :

\- Médecin informé avec données disponibles



---



\## 5. RÈGLES DE GESTION



\### RG1 : Capteurs Optionnels

Les capteurs IoT sont \*\*OPTIONNELS\*\*. L'application fonctionne avec ou sans capteurs.



\### RG2 : Modes d'Utilisation

\- \*\*Sans capteurs\*\* : Prédictions basées sur environnement (APIs) + saisies manuelles

\- \*\*Avec capteurs\*\* : Prédictions enrichies avec données biométriques + environnement local + environnement régional



\### RG3 : Distinction Utilisateur vs Patient

\- \*\*Utilisateur\*\* : Utilisation standard (avec ou sans capteurs)

\- \*\*Patient\*\* : Utilisateur + Suivi médical + Traitement + Partage médecin (avec ou sans capteurs)



\### RG4 : Maladies Ciblées

\- \*\*Asthme\*\* (prioritaire)

\- \*\*Rhume\*\*



\### RG5 : Données APIs Essentielles

Les APIs externes sont \*\*essentielles\*\* pour tous les utilisateurs, particulièrement ceux sans capteurs.



\### RG6 : Seuils d'Alerte

\*\*Pour utilisateurs avec capteurs\*\* :

\- SpO2 critique : < 90%

\- CO2 critique : > 1000 ppm



\*\*Pour tous\*\* :

\- AQI critique : > 150



\### RG7 : Saisies Manuelles

Les utilisateurs \*\*sans capteurs\*\* peuvent déclarer leurs symptômes pour alimenter l'IA.



\### RG8 : Prédictions Adaptatives

L'IA adapte ses prédictions selon le mode (avec ou sans capteurs).



---



\*\*Document corrigé le 05/12/2025 pour BreathGuard E-Santé 4.0\*\*

