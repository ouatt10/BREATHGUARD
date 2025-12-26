const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

// Initialiser Express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: '🫁 BreathGuard API',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    mongodb: 'connected'
  });
});

// Routes API (à ajouter progressivement)
// app.use('/api/users', require('./routes/users'));
app.use('/api/alertes', require('./routes/alertes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/capteurs', require('./routes/capteurs'));
app.use('/api/donnees', require('./routes/donnees')); 
app.use('/api/symptomes', require('./routes/symptomes')); 


// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route non trouvée',
    path: req.path
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║     🫁 BreathGuard Backend API        ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 Environnement: ${process.env.NODE_ENV}`);
  console.log(`🌍 URL: http://localhost:${PORT}`);
  console.log('');
});