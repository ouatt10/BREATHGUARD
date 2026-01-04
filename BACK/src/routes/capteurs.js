const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  ajouterCapteur,
  getMesCapteurs,
  mettreAJourCapteur,
  supprimerCapteur
} = require('../controllers/capteurController');

// Toutes les routes nécessitent une authentification
router.use(protect);

// Routes capteurs
router.post('/', ajouterCapteur);
router.get('/', getMesCapteurs);
router.put('/:id', mettreAJourCapteur);
router.delete('/:id', supprimerCapteur);

module.exports = router;