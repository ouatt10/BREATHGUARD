const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  creerDonneeBiometrique,
  creerDonneesMultiples,  // 🆕 NOUVELLE FONCTION
  getHistoriqueDonnees,
  getStatistiquesDonnees,
  supprimerDonnee,
  getTypesDonnees  
} = require('../controllers/donneeController');

// Toutes les routes nécessitent une authentification
router.use(protect);

// 🆕 Route pour créer PLUSIEURS données en une fois (données manuelles + capteurs IA)
router.post('/biometriques', creerDonneesMultiples);

// Route pour créer UNE SEULE donnée (ancienne méthode, conservée pour compatibilité)
router.post('/biometriques/single', creerDonneeBiometrique);

// Routes de consultation
router.get('/biometriques/historique', getHistoriqueDonnees);
router.get('/biometriques/statistiques', getStatistiquesDonnees);

// Routes de gestion
router.delete('/biometriques/:id', supprimerDonnee);
router.get('/types', getTypesDonnees);

module.exports = router;