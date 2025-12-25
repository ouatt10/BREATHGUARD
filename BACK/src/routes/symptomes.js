const express = require('express');
const router = express.Router();
const {
  ajouterSymptome,
  getSymptomes,
  getSymptomeById,
  updateSymptome,
  terminerSymptome,
  deleteSymptome
} = require('../controllers/symptomeController');
const { protect } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

router.post('/', ajouterSymptome);
router.get('/', getSymptomes);
router.get('/:id', getSymptomeById);
router.put('/:id', updateSymptome);
router.put('/:id/terminer', terminerSymptome);
router.delete('/:id', deleteSymptome);

module.exports = router;