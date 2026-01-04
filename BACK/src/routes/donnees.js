const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  creerDonneeBiometrique,
  getHistoriqueDonnees,
  getStatistiquesDonnees,
  supprimerDonnee,
  getTypesDonnees  
} = require('../controllers/donneeController');

// Toutes les routes nécessitent une authentification
router.use(protect);

// Routes biométriques
router.post('/biometriques', creerDonneeBiometrique);
router.get('/biometriques/historique', getHistoriqueDonnees);
router.get('/biometriques/statistiques', getStatistiquesDonnees);
router.delete('/biometriques/:id', supprimerDonnee);
router.get('/types', getTypesDonnees);


module.exports = router;