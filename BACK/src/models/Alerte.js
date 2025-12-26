const mongoose = require('mongoose');

const alerteSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'donnee_critique',      // Donnée biométrique critique
      'symptome_severe',      // Symptôme sévère déclaré
      'symptomes_multiples',  // Plusieurs symptômes modérés
      'batterie_faible',      // Batterie capteur < 20%
      'capteur_deconnecte',   // Capteur inactif depuis longtemps
      'tendance_negative'     // Dégradation progressive des données
    ],
    required: true
  },
  priorite: {
    type: String,
    enum: ['info', 'attention', 'urgent', 'critique'],
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  donnees: {
    type: mongoose.Schema.Types.Mixed,
    // Peut contenir : donneeBiometrique, symptome, capteur, etc.
  },
  lue: {
    type: Boolean,
    default: false
  },
  dateLecture: {
    type: Date
  },
  horodatage: {
    type: Date,
    default: Date.now
  }
});

// Index pour recherches rapides
alerteSchema.index({ utilisateur: 1, lue: 1, horodatage: -1 });
alerteSchema.index({ utilisateur: 1, type: 1 });
alerteSchema.index({ utilisateur: 1, priorite: 1 });

module.exports = mongoose.model('Alerte', alerteSchema);