const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ========================================
// GÉNÉRATION DU TOKEN JWT
// ========================================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// ========================================
// @desc    Inscription
// @route   POST /api/auth/signup
// @access  Public
// ========================================
exports.signup = async (req, res) => {
  try {
    console.log('[SIGNUP] 📝 Tentative inscription...');
    console.log('[SIGNUP] Body reçu:', JSON.stringify(req.body, null, 2));

    const { nom, prenom, email, motDePasse, telephone } = req.body;

    // Validation
    if (!nom || !prenom || !email || !motDePasse) {
      console.log('[SIGNUP] ❌ Champs manquants');
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis (nom, prenom, email, motDePasse)',
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('[SIGNUP] ❌ Email déjà utilisé');
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé',
      });
    }

    // Créer l'utilisateur
    const user = await User.create({
      nom,
      prenom,
      email,
      motDePasse,
      telephone,
    });

    console.log('[SIGNUP] ✅ Utilisateur créé:', user.email);

    // Générer le token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      data: {
        token,
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('[SIGNUP] ❌ Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: error.message,
    });
  }
};

// ========================================
// @desc    Connexion
// @route   POST /api/auth/login
// @access  Public
// ========================================
exports.login = async (req, res) => {
  try {
    console.log('[LOGIN] 🔐 Tentative connexion...');
    console.log('[LOGIN] Body reçu:', JSON.stringify(req.body, null, 2));

    // ✅ CORRECTION : Accepter à la fois "motDePasse" et "password"
    const { email, motDePasse, password } = req.body;
    const passwordToUse = motDePasse || password;

    // Validation
    if (!email || !passwordToUse) {
      console.log('[LOGIN] ❌ Email ou mot de passe manquant');
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe sont requis',
      });
    }

    // Trouver l'utilisateur avec le mot de passe
    const user = await User.findOne({ email }).select('+motDePasse');

    if (!user) {
      console.log('[LOGIN] ❌ Utilisateur non trouvé');
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(passwordToUse);

    if (!isPasswordValid) {
      console.log('[LOGIN] ❌ Mot de passe incorrect');
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect',
      });
    }

    console.log('[LOGIN] ✅ Connexion réussie:', user.email);

    // Générer le token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        token,
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('[LOGIN] ❌ Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: error.message,
    });
  }
};

// ========================================
// @desc    Récupérer le profil utilisateur
// @route   GET /api/auth/me
// @access  Private
// ========================================
exports.getMe = async (req, res) => {
  try {
    console.log('[PROFILE] 👤 Récupération profil...');

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        role: user.role,
        age: user.age,
        sexe: user.sexe,
        pathologies: user.pathologies,
        profileMedical: user.profileMedical,
      },
    });
  } catch (error) {
    console.error('[PROFILE] ❌ Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil',
      error: error.message,
    });
  }
};

// ========================================
// @desc    Mettre à jour le profil
// @route   PUT /api/auth/profile
// @access  Private
// ========================================
exports.updateProfile = async (req, res) => {
  try {
    console.log('[UPDATE] 📝 Mise à jour profil...');

    const allowedFields = ['nom', 'prenom', 'telephone', 'age', 'sexe', 'pathologies'];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
      });
    }

    console.log('[UPDATE] ✅ Profil mis à jour');

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: {
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('[UPDATE] ❌ Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil',
      error: error.message,
    });
  }
};

// ========================================
// @desc    Mettre à jour le profil médical
// @route   PUT /api/auth/profil
// @access  Private
// ========================================
exports.updateProfil = async (req, res) => {
  try {
    console.log('[PROFIL MEDICAL] 📝 Mise à jour...');

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileMedical: req.body },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
      });
    }

    console.log('[PROFIL MEDICAL] ✅ Mis à jour');

    res.json({
      success: true,
      message: 'Profil médical mis à jour',
      data: user.profileMedical,
    });
  } catch (error) {
    console.error('[PROFIL MEDICAL] ❌ Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil médical',
      error: error.message,
    });
  }
};