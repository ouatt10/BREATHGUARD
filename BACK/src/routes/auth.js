const express = require('express');
const router = express.Router();
const { 
  signup, 
  login, 
  getMe, 
  updateProfile,
  updateProfil
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Routes publiques
router.post('/signup', signup);
router.post('/login', login);

// Routes protégées
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/profil', protect, updateProfil);

module.exports = router;