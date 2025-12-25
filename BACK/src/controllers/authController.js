const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Inscription d'un utilisateur
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, telephone } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà.'
      });
    }

    // Créer l'utilisateur
    const user = await User.create({
      nom,
      prenom,
      email,
      motDePasse,
      telephone
    });

    // Générer le token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès.',
      data: {
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          role: user.role,
          hasSensors: user.hasSensors,
          isPatient: user.isPatient
        },
        token
      }
    });
  } catch (error) {
    console.error('Erreur signup:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du compte.',
      error: error.message
    });
  }
};

// @desc    Connexion d'un utilisateur
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifier que l'email et le mot de passe sont fournis
    if (!email || !motDePasse) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis.'
      });
    }

    // Récupérer l'utilisateur avec le mot de passe
    const user = await User.findOne({ email }).select('+motDePasse');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.'
      });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(motDePasse);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.'
      });
    }

    // Générer le token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Connexion réussie.',
      data: {
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          role: user.role,
          hasSensors: user.hasSensors,
          isPatient: user.isPatient
        },
        token
      }
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion.',
      error: error.message
    });
  }
};

// @desc    Récupérer le profil de l'utilisateur connecté
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('capteurs');

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          role: user.role,
          hasSensors: user.hasSensors,
          isPatient: user.isPatient,
          age: user.age,
          sexe: user.sexe,
          pathologies: user.pathologies,
          profileMedical: user.profileMedical,
          capteurs: user.capteurs,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Erreur getMe:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil.',
      error: error.message
    });
  }
};

// @desc    Mettre à jour le profil
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { nom, prenom, telephone, isPatient, profileMedical } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur introuvable.'
      });
    }

    // Mise à jour des champs
    if (nom) user.nom = nom;
    if (prenom) user.prenom = prenom;
    if (telephone) user.telephone = telephone;
    if (typeof isPatient !== 'undefined') user.isPatient = isPatient;
    if (profileMedical) user.profileMedical = { ...user.profileMedical, ...profileMedical };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès.',
      data: { user }
    });
  } catch (error) {
    console.error('Erreur updateProfile:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil.',
      error: error.message
    });
  }
};

// @desc    Mettre à jour le profil médical (âge, sexe, pathologies)
// @route   PUT /api/auth/profil
// @access  Private
exports.updateProfil = async (req, res) => {
  try {
    const { age, sexe, pathologies } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur introuvable.'
      });
    }

    // Mise à jour uniquement des champs fournis
    if (age !== undefined) user.age = age;
    if (sexe !== undefined) user.sexe = sexe;
    if (pathologies !== undefined) user.pathologies = pathologies;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profil médical mis à jour avec succès.',
      data: {
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          age: user.age,
          sexe: user.sexe,
          pathologies: user.pathologies
        }
      }
    });
  } catch (error) {
    console.error('Erreur updateProfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil.',
      error: error.message
    });
  }
};