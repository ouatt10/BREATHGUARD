const express = require('express');
const router = express.Router();
const {
  getAlertes,
  creerAlerte,
  marquerCommeLue,
  marquerToutCommeLu,
  deleteAlerte,
  getAlertesNonLues
} = require('../controllers/alerteController');
const { protect } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

router.get('/', getAlertes);
router.get('/non-lues', getAlertesNonLues);
router.post('/', creerAlerte);
router.put('/lire-tout', marquerToutCommeLu);
router.put('/:id/lire', marquerCommeLue);
router.delete('/:id', deleteAlerte);

module.exports = router;