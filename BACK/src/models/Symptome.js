const mongoose = require('mongoose');

const symptomeSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'toux',
      'essoufflement',
      'douleur_thoracique',
      'fatigue',
      'fievre',
      'maux_tete',
      'perte_appetit',
      'difficulte_respirer',
      'sifflements',
      'oppression_thoracique',
      'autre'
    ],
    required: true
  },
  intensite: {
    type: String,
    enum: ['legere', 'moderee', 'severe'],
    required: true
  },
  notes: {
    type: String,
    maxlength: 500
  },
  duree: {
    type: String,
    enum: ['moins_1h', '1_6h', '6_24h', 'plus_24h']
  },
  dateDebut: {
    type: Date,
    default: Date.now
  },
  dateFin: {
    type: Date
  },
  actif: {
    type: Boolean,
    default: true
  },
  horodatage: {
    type: Date,
    default: Date.now
  }
});

// Index pour recherches rapides
symptomeSchema.index({ utilisateur: 1, horodatage: -1 });
symptomeSchema.index({ utilisateur: 1, type: 1 });

module.exports = mongoose.model('Symptome', symptomeSchema);