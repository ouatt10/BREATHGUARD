require('dotenv').config();
const mongoose = require('mongoose');
const TypeDonnee = require('./src/models/TypeDonnee');

const typesParDefaut = [
  {
    nom: 'spo2',
    label: 'Saturation en Oxygène',
    unite: '%',
    categorie: 'biometrique',
    icone: '🫁',
    description: 'Mesure du taux d\'oxygène dans le sang',
    seuils: {
      critique: { min: 0, max: 90 },
      attention: { min: 90, max: 94 },
      normal: { min: 95, max: 100 }
    },
    messages: {
      critique: '🚨 SpO2 critique - Danger immédiat !',
      attention: '⚠️ SpO2 légèrement bas',
      normal: '✅ SpO2 normal'
    },
    alertesActives: true,
    systeme: true
  },
  {
    nom: 'frequence_cardiaque',
    label: 'Fréquence Cardiaque',
    unite: 'bpm',
    categorie: 'biometrique',
    icone: '🫀',
    description: 'Nombre de battements cardiaques par minute',
    seuils: {
      critique: { min: 0, max: 40 },
      attention: { min: 40, max: 60 },
      normal: { min: 60, max: 100 }
    },
    messages: {
      critique: '🚨 Fréquence cardiaque dangereuse !',
      attention: '⚠️ Fréquence cardiaque anormale',
      normal: '✅ Fréquence cardiaque normale'
    },
    alertesActives: true,
    systeme: true
  },
  {
    nom: 'frequence_respiratoire',
    label: 'Fréquence Respiratoire',
    unite: '/min',
    categorie: 'biometrique',
    icone: '🌬️',
    description: 'Nombre de respirations par minute',
    seuils: {
      critique: { min: 0, max: 8 },
      attention: { min: 8, max: 12 },
      normal: { min: 12, max: 20 }
    },
    messages: {
      critique: '🚨 Fréquence respiratoire critique !',
      attention: '⚠️ Fréquence respiratoire anormale',
      normal: '✅ Fréquence respiratoire normale'
    },
    alertesActives: true,
    systeme: true
  },
  {
    nom: 'temperature',
    label: 'Température Corporelle',
    unite: '°C',
    categorie: 'biometrique',
    icone: '🌡️',
    description: 'Température du corps',
    seuils: {
      critique: { min: 0, max: 35 },
      attention: { min: 35, max: 36.5 },
      normal: { min: 36.5, max: 37.5 }
    },
    messages: {
      critique: '🚨 Température critique !',
      attention: '⚠️ Température anormale',
      normal: '✅ Température normale'
    },
    alertesActives: true,
    systeme: true
  },
  {
    nom: 'glycemie',
    label: 'Glycémie',
    unite: 'mg/dL',
    categorie: 'biometrique',
    icone: '🩸',
    description: 'Taux de glucose dans le sang',
    seuils: {
      critique: { min: 0, max: 70 },
      attention: { min: 70, max: 100 },
      normal: { min: 100, max: 140 }
    },
    messages: {
      critique: '🚨 Glycémie critique !',
      attention: '⚠️ Glycémie anormale',
      normal: '✅ Glycémie normale'
    },
    alertesActives: true,
    systeme: true
  },
  {
    nom: 'poids',
    label: 'Poids',
    unite: 'kg',
    categorie: 'biometrique',
    icone: '⚖️',
    description: 'Poids corporel',
    seuils: {
      critique: { min: null, max: null },
      attention: { min: null, max: null },
      normal: { min: null, max: null }
    },
    alertesActives: false,
    systeme: true
  },
  {
    nom: 'steps',
    label: 'Nombre de pas',
    unite: 'pas',
    categorie: 'activite',
    icone: '👟',
    description: 'Nombre de pas effectués',
    seuils: {
      critique: { min: null, max: null },
      attention: { min: null, max: null },
      normal: { min: 5000, max: null }
    },
    alertesActives: false,
    systeme: true
  }
];

async function initialiserTypes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB\n');

    // Supprimer les types existants (optionnel)
    // await TypeDonnee.deleteMany({});

    for (const type of typesParDefaut) {
      const existe = await TypeDonnee.findOne({ nom: type.nom });
      
      if (!existe) {
        await TypeDonnee.create(type);
        console.log(`✅ Type créé : ${type.label} (${type.nom})`);
      } else {
        console.log(`ℹ️  Type existant : ${type.label} (${type.nom})`);
      }
    }

    console.log('\n🎉 Initialisation des types terminée !');
    console.log(`📊 ${typesParDefaut.length} types disponibles\n`);

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

initialiserTypes();