# 🫁 BreathGuard - Système Intelligent de Prédiction de Crises Respiratoires

> Plateforme d'analyse prédictive et de prévention des crises respiratoires avec IA et alertes automatiques en temps réel

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📋 Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [API Documentation](#-api-documentation)
- [Système d'Alertes Prédictives](#-système-dalertes-prédictives)
- [Types de Données](#-types-de-données)
- [Seuils Médicaux](#-seuils-médicaux)
- [IA et Prédiction](#-ia-et-prédiction)
- [Tests](#-tests)
- [Déploiement](#-déploiement)

---

## 🎯 Vue d'ensemble

**BreathGuard** est un système intelligent de **prédiction et prévention** des crises respiratoires. Contrairement aux simples outils de monitoring, BreathGuard utilise l'analyse en temps réel des données biométriques pour **anticiper** les problèmes avant qu'ils ne deviennent critiques.

### 🚀 Innovation Principale

**PRÉDICTION, pas seulement monitoring :**
- ⚡ Détection précoce des anomalies
- 🧠 Analyse intelligente des tendances
- 📊 Prédiction de crises potentielles
- 🚨 Alertes préventives avant danger
- 🎯 Recommandations personnalisées

### Cas d'usage

- 🏥 **Prévention** des crises d'asthme/BPCO
- 👴 **Surveillance prédictive** de personnes âgées
- 🏃 **Optimisation** performance sportive
- 🔬 **Recherche** sur patterns respiratoires
- 📊 **Collecte intelligente** de données IoT

### Différence avec le Monitoring Classique

| Monitoring Classique | BreathGuard (Prédictif) |
|---------------------|-------------------------|
| ❌ Réagit après le problème | ✅ Anticipe avant le problème |
| ❌ Alerte quand c'est déjà critique | ✅ Alerte avant que ça devienne critique |
| ❌ Pas d'analyse de tendances | ✅ Analyse patterns et évolution |
| ❌ Pas de recommandations | ✅ Conseils personnalisés |
| ❌ Données isolées | ✅ Corrélation multi-paramètres |

---

## ✨ Fonctionnalités

### Core Features - Système Prédictif

- ✅ **Analyse prédictive temps réel** des signes vitaux
- ✅ **Détection précoce** d'anomalies avant crise
- ✅ **Alertes préventives** multi-niveaux (info → critique)
- ✅ **Corrélation intelligente** entre SpO2, FC, FR
- ✅ **Recommandations personnalisées** selon profil utilisateur
- ✅ **Historique et tendances** pour analyse IA (à venir)
- ✅ **Prévention de fausses alertes** (validation temporelle)
- ✅ **Capteurs IoT connectés** (ESP32) en temps réel

### Prédiction Multi-Paramètres

Le système analyse **simultanément** :
- 🫁 SpO2 (Saturation en Oxygène)
- 🫀 Fréquence Cardiaque
- 💨 Fréquence Respiratoire
- 🌡️ Température corporelle
- 📊 Tendances et variations

**→ Détection de patterns anormaux avant crise**

### Données Supportées

| Type | Unité | Analyse Prédictive |
|------|-------|-------------------|
| SpO2 (Saturation en Oxygène) | % | ✅ Active |
| Fréquence Cardiaque | bpm | ✅ Active |
| Fréquence Respiratoire | /min | ✅ Active |
| Température | °C | ✅ Active |
| Glycémie | mg/dL | ⚙️ Configurable |
| Poids | kg | ⚙️ Configurable |
| Nombre de pas | pas | ⚙️ Configurable |
| **Types personnalisés** | Libre | ⚙️ Configurable |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│            Capteurs IoT (ESP32) / App Mobile             │
│              🫁 SpO2 | 🫀 FC | 💨 FR | 🌡️ T°            │
└────────────────────┬────────────────────────────────────┘
                     │ WiFi/BLE → HTTPS/JWT
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Express.js API Server (Node.js)             │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Auth Routes  │  │ Data Routes  │  │ Alert Routes │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
│         │                  │                  │          │
│         ▼                  ▼                  ▼          │
│  ┌─────────────────────────────────────────────────┐  │
│  │         🧠 MOTEUR D'ANALYSE PRÉDICTIVE          │  │
│  │  • Détection anomalies en temps réel            │  │
│  │  • Corrélation multi-paramètres                 │  │
│  │  • Création alertes préventives                 │  │
│  │  • Validation anti-doublons (5min)              │  │
│  └────────────────────┬────────────────────────────┘  │
│                       ▼                                 │
│  ┌─────────────────────────────────────────────────┐  │
│  │            Mongoose Models + MongoDB            │  │
│  │  Users | DonneesBio | Alertes | Types | Capteurs│  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                       ▼
          ┌─────────────────────────────┐
          │   🎯 Prochaine Étape (à venir) │
          │   Module IA/ML TensorFlow.js   │
          │   • Prédiction crises 24h      │
          │   • Apprentissage patterns     │
          │   • Score de risque            │
          └─────────────────────────────────┘
```

### Stack Technique

- **Runtime:** Node.js v14+
- **Framework:** Express.js v4.x
- **Base de données:** MongoDB v4.x+ (Atlas ou local)
- **ODM:** Mongoose v8.x
- **Authentification:** JWT (jsonwebtoken)
- **Sécurité:** bcryptjs, helmet, express-rate-limit
- **Validation:** Mongoose Schema Validation
- **Environnement:** dotenv
- **IA (à venir):** TensorFlow.js, Brain.js

---

## 🚀 Installation

### Prérequis

- Node.js >= 14.0.0
- MongoDB >= 4.0 (local ou Atlas)
- npm ou yarn
- ESP32 avec capteurs pour tests réels

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/votre-repo/breathguard-backend.git
cd breathguard-backend

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env
cp .env.example .env

# 4. Configurer les variables d'environnement
nano .env

# 5. Initialiser les types de données avec seuils prédictifs
node init-types.js

# 6. Démarrer le serveur
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

**Sortie attendue :**
```
╔════════════════════════════════════════╗
║     🫁 BreathGuard Backend API        ║
╚════════════════════════════════════════╝
🚀 Serveur démarré sur le port 5000
📡 Environnement: development
🌍 URL: http://localhost:5000

✅ MongoDB connecté: 127.0.0.1
📦 Base de données: breathguard
```

---

## ⚙️ Configuration

### Variables d'environnement (.env)

```env
# Serveur
NODE_ENV=development
PORT=5000

# Base de données
MONGO_URI=mongodb://127.0.0.1:27017/breathguard
# ou MongoDB Atlas:
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/breathguard

# JWT
JWT_SECRET=votre_secret_jwt_super_securise_ici
JWT_EXPIRE=7d

# Sécurité (optionnel)
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Initialisation des Types

Le script `init-types.js` configure les 7 types par défaut avec leurs **seuils prédictifs** :

```bash
node init-types.js
```

**Sortie attendue :**
```
✅ Connecté à MongoDB
✅ Type créé : Saturation en Oxygène (spo2)
✅ Type créé : Fréquence Cardiaque (frequence_cardiaque)
✅ Type créé : Fréquence Respiratoire (frequence_respiratoire)
✅ Type créé : Température Corporelle (temperature)
✅ Type créé : Glycémie (glycemie)
✅ Type créé : Poids (poids)
✅ Type créé : Nombre de pas (steps)
🎉 Initialisation des types terminée !
📊 7 types disponibles
```

---

## 💻 Utilisation

### 1. Inscription

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "prenom": "John",
  "nom": "Doe",
  "email": "john@example.com",
  "motDePasse": "securepassword123",
  "telephone": "+2250768041147",
  "age": 30,
  "sexe": "homme",
  "pathologies": ["asthme"]
}
```

**Réponse :**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "data": {
    "utilisateur": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Enregistrer une Donnée (Analyse Prédictive Automatique)

```bash
POST /api/donnees/biometriques
Authorization: Bearer <votre_token>
Content-Type: application/json

{
  "type": "spo2",
  "valeur": 92,
  "unite": "%",
  "capteur": "6958ed42135b6c3e6e10af7c"
}
```

**Réponse (valeur en attention - PRÉDICTION) :**
```json
{
  "success": true,
  "message": "Donnée biométrique enregistrée avec succès",
  "data": {
    "_id": "...",
    "type": "spo2",
    "valeur": 92,
    "statut": "attention",
    "message": "⚠️ SpO2 légèrement bas",
    "couleur": "#FF9800"
  },
  "alerte": {
    "type": "donnee_anormale",
    "priorite": "attention",
    "titre": "⚠️ SpO2 en Zone d'Attention",
    "message": "SpO2 à 92% - En dessous de la normale (≥95%). Surveillez votre respiration."
  }
}
```

**→ Le système PRÉVIENT avant que ça devienne critique !**

**Réponse (valeur critique - ALERTE IMMÉDIATE) :**
```json
{
  "alerte": {
    "priorite": "critique",
    "titre": "🚨 SpO2 Critique",
    "message": "Saturation en oxygène dangereusement basse : 85%. Intervention immédiate requise !"
  }
}
```

### 3. Consulter les Alertes Prédictives

```bash
GET /api/alertes
Authorization: Bearer <votre_token>
```

**Réponse :**
```json
{
  "success": true,
  "count": 3,
  "data": {
    "alertes": [
      {
        "priorite": "critique",
        "titre": "🚨 Tachycardie Sévère",
        "message": "FC à 160 bpm - Intervention immédiate !",
        "lue": false
      },
      {
        "priorite": "attention",
        "titre": "⚠️ SpO2 en Baisse",
        "message": "SpO2 à 92% - Surveillez votre respiration",
        "lue": false
      }
    ],
    "stats": {
      "total": 3,
      "nonLues": 3,
      "parPriorite": {
        "critique": 1,
        "urgent": 0,
        "attention": 2
      }
    }
  }
}
```

---

## 📚 API Documentation

### Authentification

#### POST /api/auth/signup
Créer un nouveau compte utilisateur

**Body:**
```json
{
  "prenom": "string (required)",
  "nom": "string (optional)",
  "email": "string (required, unique)",
  "motDePasse": "string (required, min 6 chars)",
  "telephone": "string (optional)",
  "age": "number (optional)",
  "sexe": "string (optional)",
  "pathologies": ["array of strings (optional)"]
}
```

#### POST /api/auth/login
Se connecter

**Body:**
```json
{
  "email": "string",
  "motDePasse": "string"
}
```

#### GET /api/auth/me
Obtenir le profil utilisateur

**Headers:** `Authorization: Bearer <token>`

---

### Données Biométriques

#### GET /api/donnees/types
Liste tous les types de données avec leurs seuils prédictifs

**Headers:** `Authorization: Bearer <token>`

**Réponse:**
```json
{
  "success": true,
  "count": 7,
  "data": [
    {
      "nom": "spo2",
      "label": "Saturation en Oxygène",
      "unite": "%",
      "seuils": {
        "critique": { "max": 90 },
        "attention": { "min": 90, "max": 95 },
        "normal": { "min": 95 }
      },
      "alertesActives": true
    }
  ]
}
```

#### POST /api/donnees/biometriques
Créer une nouvelle donnée avec **analyse prédictive automatique**

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "type": "spo2",
  "valeur": 95,
  "unite": "%",
  "capteur": "objectId (optional)"
}
```

**Ce qui se passe en arrière-plan :**
1. ✅ Donnée enregistrée
2. 🧠 Analyse automatique des seuils
3. 🎯 Détection d'anomalie (si applicable)
4. 🚨 Création alerte préventive (si nécessaire)
5. 📊 Retour avec statut + message + recommandation

#### GET /api/donnees/biometriques/historique
Récupérer l'historique pour analyse de tendances

**Query Params:**
- `type` (optional): Filtrer par type
- `limit` (optional): Nombre de résultats (défaut: 50)
- `page` (optional): Page (défaut: 1)

#### GET /api/donnees/biometriques/statistiques
Obtenir les statistiques et tendances

**Query Params:**
- `type` (required): Type de donnée
- `periode` (optional): 24h, 7j, 30j (défaut: 7j)

**Réponse inclut :**
- Moyenne, Min, Max
- Nombre d'alertes par niveau
- Évolution temporelle

#### DELETE /api/donnees/biometriques/:id
Supprimer une donnée

---

### Alertes Prédictives

#### GET /api/alertes
Liste toutes les alertes avec statistiques

#### PUT /api/alertes/:id/lire
Marquer une alerte comme lue

#### PUT /api/alertes/lire-tout
Marquer toutes les alertes comme lues

#### DELETE /api/alertes/:id
Supprimer une alerte

---

### Capteurs IoT

#### POST /api/capteurs
Enregistrer un nouveau capteur ESP32

**Body:**
```json
{
  "idCapteur": "ESP32-001",
  "typeCapteur": "ESP32-BreathGuard"
}
```

#### GET /api/capteurs
Liste les capteurs de l'utilisateur

#### PUT /api/capteurs/:id
Mettre à jour un capteur (batterie, statut)

**Body:**
```json
{
  "batterie": 85,
  "statut": "actif"
}
```

---

## 🚨 Système d'Alertes Prédictives

### Philosophie : PRÉVENIR, pas seulement ALERTER

```
┌─────────────────────────────────────────────────────────┐
│         SYSTÈME PRÉDICTIF À 3 NIVEAUX                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1️⃣ ATTENTION (92-94% SpO2)                            │
│     → Alerte préventive : "Surveillez votre respiration"│
│     → AVANT que ça devienne critique                    │
│                                                          │
│  2️⃣ URGENT (Tendance à la baisse)                      │
│     → "Valeurs anormales détectées - Préparez inhalateur"│
│     → Analyse de patterns                               │
│                                                          │
│  3️⃣ CRITIQUE (< 90% SpO2)                              │
│     → "Intervention immédiate requise !"                │
│     → Crise en cours                                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Logique de Prédiction

**Donnée reçue :**
```javascript
SpO2 = 92%
```

**Analyse en temps réel :**
```
1. Vérification seuils :
   92% < 95% (normal) ✓
   92% > 90% (critique) ✓
   → Niveau "ATTENTION"

2. Création alerte préventive :
   {
     priorite: "attention",
     titre: "⚠️ SpO2 en Zone d'Attention",
     message: "Surveillez votre respiration..."
   }

3. Recommandation :
   "Reposez-vous, respirez profondément"
```

**→ L'utilisateur est prévenu AVANT la crise !**

### Anti-Doublons Intelligents

Pour éviter le spam d'alertes :
- ✅ Vérification : Pas d'alerte similaire dans les **5 dernières minutes**
- ✅ Validation temporelle avant création
- ✅ Agrégation de données pour détection de tendances (à venir)

### Exemple Concret

**Scénario : Début de crise d'asthme**

```
10:00 → SpO2 = 97% → ✅ Normal
10:05 → SpO2 = 94% → ⚠️ Alerte ATTENTION créée
10:10 → SpO2 = 91% → ⚠️ Alerte ATTENTION (pas de doublon)
10:15 → SpO2 = 88% → 🚨 Alerte CRITIQUE créée
```

**→ Utilisateur prévenu dès 10:05, pas à 10:15 quand c'est déjà grave !**

---

## 📊 Types de Données

### Types Préconfigurés avec Seuils Prédictifs

#### 1. SpO2 (Saturation en Oxygène)
- **Unité:** %
- **Normal:** ≥ 95%
- **Attention:** 90-94% ⚠️ **Alerte préventive**
- **Critique:** < 90% 🚨 **Alerte immédiate**
- **Prédiction:** ✅ Active

#### 2. Fréquence Cardiaque
- **Unité:** bpm
- **Normal:** 60-100 bpm
- **Attention:** 50-60 / 130-150 bpm ⚠️
- **Critique:** < 40 / > 150 bpm 🚨
- **Prédiction:** ✅ Active

#### 3. Fréquence Respiratoire
- **Unité:** /min
- **Normal:** 12-20 /min
- **Attention:** 8-12 / 25-30 /min ⚠️
- **Critique:** < 8 / > 30 /min 🚨
- **Prédiction:** ✅ Active

#### 4. Température
- **Unité:** °C
- **Normal:** 36.5-37.5°C
- **Attention:** 37.5-38 / 35-36.5°C ⚠️
- **Critique:** > 38 / < 35°C 🚨
- **Prédiction:** ✅ Active

---

## 🔬 Seuils Médicaux

### Configuration Actuelle

**Fichier:** `src/controllers/donneeController.js`

```javascript
const SEUILS_ANALYSE = {
  spo2: {
    critique: { min: 0, max: 90 },
    attention: { min: 90, max: 94 },  // Zone prédictive !
    normal: { min: 95, max: 100 }
  },
  frequence_cardiaque: {
    critique_bas: { min: 0, max: 40 },
    critique_haut: { min: 150, max: 300 },
    attention_bas: { min: 40, max: 50 },    // Zone prédictive
    attention_haut: { min: 130, max: 150 }, // Zone prédictive
    normal: { min: 60, max: 100 }
  }
};
```

### Seuils Basés sur Standards Médicaux

Sources :
- American Thoracic Society (ATS)
- European Respiratory Society (ERS)
- WHO Guidelines

---

## 🧠 IA et Prédiction

### État Actuel (V1.0)

✅ **Analyse en temps réel** avec seuils statiques  
✅ **Alertes préventives** multi-niveaux  
✅ **Corrélation basique** entre paramètres  

### Prochaine Étape (V2.0) - Module IA

```javascript
// À venir - TensorFlow.js / Brain.js
const predictionIA = {
  // Analyse de patterns
  detecterTendances(historique) {
    // Régression pour prédire évolution
    // Détection anomalies par ML
  },
  
  // Score de risque
  calculerRisqueCrise(donnees, profil) {
    // Risque 0-100% dans les 24h
    // Basé sur historique + profil utilisateur
  },
  
  // Recommandations personnalisées
  genererRecommandations(analyse) {
    // "Prenez votre inhalateur préventif"
    // "Évitez l'exercice intense aujourd'hui"
  }
};
```

### Fonctionnalités IA Planifiées

- 🎯 **Prédiction de crises** 24h à l'avance (score de risque)
- 📊 **Apprentissage patterns** personnels de l'utilisateur
- 🧠 **Détection anomalies** par Machine Learning
- 💡 **Recommandations intelligentes** contextuelles
- 📈 **Analyse corrélation** avec facteurs externes (météo, pollution, etc.)

---

## 🧪 Tests

### Scénarios de Test Prédictif

#### Test 1 : Détection Précoce
```json
POST /api/donnees/biometriques
{
  "type": "spo2",
  "valeur": 92
}
```
✅ **Attendu :** Alerte "attention" (prédictive, pas critique)

#### Test 2 : Crise en Cours
```json
{
  "type": "spo2",
  "valeur": 85
}
```
🚨 **Attendu :** Alerte "critique" (immédiate)

#### Test 3 : Valeur Normale
```json
{
  "type": "spo2",
  "valeur": 97
}
```
✅ **Attendu :** Pas d'alerte

#### Test 4 : Multi-Paramètres
```json
// Envoyer successivement :
{ "type": "spo2", "valeur": 92 }
{ "type": "frequence_cardiaque", "valeur": 145 }
{ "type": "frequence_respiratoire", "valeur": 28 }
```
🎯 **Attendu :** 3 alertes créées (corrélation multi-paramètres)

---

## 🚀 Déploiement

### Déploiement Render (Recommandé)

```bash
# 1. Créer compte sur render.com

# 2. Créer un Web Service
# - Repository: GitHub/GitLab
# - Environment: Node
# - Build Command: npm install
# - Start Command: npm start

# 3. Ajouter Variables d'Environnement
MONGO_URI=mongodb+srv://...
JWT_SECRET=votre_secret
NODE_ENV=production

# 4. Créer base MongoDB sur MongoDB Atlas
# https://www.mongodb.com/cloud/atlas

# 5. Déployer
git push origin main
# → Render déploie automatiquement

# 6. Initialiser les types
# Via Shell dans Render Dashboard :
node init-types.js
```

### Déploiement Railway

```bash
# 1. Installer Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialiser
railway init

# 4. Ajouter MongoDB
railway add mongodb

# 5. Configurer variables
railway variables set JWT_SECRET=votre_secret

# 6. Déployer
railway up

# 7. Initialiser types
railway run node init-types.js
```

### Déploiement Docker

```dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

```bash
docker build -t breathguard-api .
docker run -p 5000:5000 --env-file .env breathguard-api
```

---

## 📈 Roadmap

### Phase 1 : Base (Actuel) ✅
- [x] API REST complète
- [x] Authentification JWT
- [x] Enregistrement données
- [x] Alertes préventives automatiques
- [x] Seuils prédictifs configurables
- [x] Support ESP32

### Phase 2 : IA Prédictive 🔄
- [ ] Module TensorFlow.js/Brain.js
- [ ] Prédiction crises 24h (score risque)
- [ ] Apprentissage patterns utilisateur
- [ ] Recommandations intelligentes
- [ ] Analyse multi-paramètres avancée

### Phase 3 : Intégrations 📱
- [ ] App mobile React Native
- [ ] Dashboard web React
- [ ] WebSocket notifications temps réel
- [ ] Export données (CSV, PDF)
- [ ] API publique avec rate limiting

### Phase 4 : Avancé 🚀
- [ ] Intégration météo/pollution
- [ ] Multi-langues (i18n)
- [ ] Tests unitaires/intégration complets
- [ ] CI/CD GitHub Actions
- [ ] Monitoring Sentry/DataDog

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/PredictionIA`)
3. Commit les changements (`git commit -m 'Add IA prediction module'`)
4. Push vers la branche (`git push origin feature/PredictionIA`)
5. Ouvrir