const express = require('express');
const router = express.Router();
const {
  connectCapteur,
  getCapteurs,
  disconnectCapteur,
  updateCapteurStatus
} = require('../controllers/capteurController');
const { protect } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

router.post('/connect', connectCapteur);
router.get('/', getCapteurs);
router.delete('/:id', disconnectCapteur);
router.put('/:id/status', updateCapteurStatus);

module.exports = router;