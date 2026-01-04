const mongoose = require('mongoose');

const TypeDonneeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  label: {
    type: String,
    required: true
  },
  
  unite: {
    type: String,
    required: true
  },
  
  categorie: {
    type: String,
    enum: ['biometrique', 'environnementale', 'activite', 'autre'],
    default: 'autre'
  },
  
  // Seuils pour les alertes automatiques
  seuils: {
    critique: {
      min: { type: Number, default: null },
      max: { type: Number, default: null }
    },
    attention: {
      min: { type: Number, default: null },
      max: { type: Number, default: null }
    },
    normal: {
      min: { type: Number, default: null },
      max: { type: Number, default: null }
    }
  },
  
  // Messages personnalisés
  messages: {
    critique: {
      type: String,
      default: '🚨 Valeur critique détectée'
    },
    attention: {
      type: String,
      default: '⚠️ Valeur nécessitant une attention'
    },
    normal: {
      type: String,
      default: '✅ Valeur normale'
    }
  },
  
  // Couleurs pour l'interface
  couleurs: {
    critique: {
      type: String,
      default: '#F44336'
    },
    attention: {
      type: String,
      default: '#FF9800'
    },
    normal: {
      type: String,
      default: '#4CAF50'
    }
  },
  
  // Activer/désactiver les alertes pour ce type
  alertesActives: {
    type: Boolean,
    default: true
  },
  
  // Créé par l'utilisateur ou par défaut
  systeme: {
    type: Boolean,
    default: false
  },
  
  // Icône pour l'interface
  icone: {
    type: String,
    default: '📊'
  },
  
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TypeDonnee', TypeDonneeSchema);