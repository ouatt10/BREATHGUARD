const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Récupérer l'URI MongoDB depuis les variables d'environnement
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    // Vérification de sécurité
    if (!mongoURI) {
      console.error('❌ MONGO_URI non défini dans .env');
      console.log('📋 Contenu .env:', {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
        MONGO_URI: process.env.MONGO_URI
      });
      process.exit(1);
    }

    // Connexion à MongoDB
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    console.log(`📦 Base de données: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Erreur connexion MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;