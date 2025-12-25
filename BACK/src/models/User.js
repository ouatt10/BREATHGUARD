const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  motDePasse: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  telephone: String,
  
  // 🔥 AJOUT : Informations pour l'analyse intelligente
  age: {
    type: Number,
    default: 30
  },
  sexe: {
    type: String,
    enum: ['homme', 'femme', 'autre'],
    default: 'homme'
  },
  pathologies: {
    type: [String],
    default: []
  },
  
  role: {
    type: String,
    enum: ['utilisateur', 'patient', 'medecin'],
    default: 'utilisateur'
  },
  hasSensors: {
    type: Boolean,
    default: false
  },
  isPatient: {
    type: Boolean,
    default: false
  },
  profileMedical: {
    dateNaissance: Date,
    pathologie: String,
    severite: String,
    allergies: [String],
    traitements: [{
      nomMedicament: String,
      dosage: String,
      frequence: String,
      dateDebut: Date
    }]
  },
  medecin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medecin'
  },
  capteurs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Capteur'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password avant sauvegarde - SANS next()
userSchema.pre('save', async function() {
  if (!this.isModified('motDePasse')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);