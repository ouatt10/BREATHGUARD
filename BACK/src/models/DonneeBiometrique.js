const mongoose = require('mongoose');

const donneeBiometriqueSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  capteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Capteur',
    required: true
  },
  type: {
    type: String,
    enum: ['spo2', 'frequenceRespiratoire', 'frequenceCardiaque'],
    required: true
  },
  valeur: {
    type: Number,
    required: true
  },
  unite: {
    type: String,
    required: true
  },
  statut: {
    type: String,
    enum: ['normal', 'attention', 'critique', 'acceptable', 'erreur'],
    default: 'normal'
  },
  // 🔥 AJOUTEZ CES 4 CHAMPS ICI
  niveau: {
    type: Number,
    min: 0,
    max: 5
  },
  message: {
    type: String
  },
  recommandation: {
    type: String
  },
  couleur: {
    type: String
  },
  horodatage: {
    type: Date,
    default: Date.now
  }
});

donneeBiometriqueSchema.index({ utilisateur: 1, type: 1, horodatage: -1 });

module.exports = mongoose.model('DonneeBiometrique', donneeBiometriqueSchema);