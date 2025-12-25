const mongoose = require('mongoose');

const donneeEnvironnementaleSchema = new mongoose.Schema({
  localisation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    ville: String,
    pays: String
  },
  AQI: {
    type: Number,
    min: 0,
    max: 500
  },
  temperature: Number,
  humidite: Number,
  pollution: {
    pm25: Number,
    pm10: Number,
    co2: Number,
    no2: Number,
    o3: Number
  },
  pollen: {
    type: String,
    enum: ['faible', 'moyen', 'eleve', 'tres_eleve']
  },
  horodatage: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    enum: ['capteur', 'api_externe'],
    default: 'api_externe'
  },
  capteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Capteur'
  }
});

// Index géospatial
donneeEnvironnementaleSchema.index({ localisation: '2dsphere' });
donneeEnvironnementaleSchema.index({ horodatage: -1 });

module.exports = mongoose.model('DonneeEnvironnementale', donneeEnvironnementaleSchema);