const mongoose = require('mongoose');

const capteurSchema = new mongoose.Schema({
  idCapteur: {
    type: String,
    required: true,
    unique: true
  },
  typeCapteur: {
    type: String,
    enum: ['ESP32-BreathGuard'],
    default: 'ESP32-BreathGuard'
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  statut: {
    type: String,
    enum: ['actif', 'inactif', 'erreur'],
    default: 'actif'
  },
  batterie: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  derniereSynchronisation: {
    type: Date,
    default: Date.now
  },
  dateActivation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Capteur', capteurSchema);