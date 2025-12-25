const express = require('express');
const router = express.Router();
const {
  addDonneeBiometrique,
  getDonneesRealtime,
  getHistorique,
  addDonneeEnvironnementale
} = require('../controllers/donneeController');
const { protect } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

// Routes biométriques
router.post('/biometriques', addDonneeBiometrique);
router.get('/biometriques/realtime', getDonneesRealtime);
router.get('/biometriques/historique', getHistorique);

// Routes environnementales
router.post('/environnementales', addDonneeEnvironnementale);

module.exports = router;