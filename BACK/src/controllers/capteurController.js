const Capteur = require('../models/Capteur');
const User = require('../models/User');

// @desc    Connecter un capteur à l'utilisateur
// @route   POST /api/capteurs/connect
// @access  Private
exports.connectCapteur = async (req, res) => {
  try {
    const { idCapteur } = req.body;

    if (!idCapteur) {
      return res.status(400).json({
        success: false,
        message: 'ID du capteur requis.'
      });
    }

    // Vérifier si le capteur existe déjà
    let capteur = await Capteur.findOne({ idCapteur });

    if (capteur) {
      // Si le capteur existe, vérifier s'il n'est pas déjà connecté à un autre utilisateur
      if (capteur.utilisateur.toString() !== req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Ce capteur est déjà connecté à un autre utilisateur.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Capteur déjà connecté.',
        data: { capteur }
      });
    }

    // Créer le nouveau capteur
    capteur = await Capteur.create({
      idCapteur,
      utilisateur: req.user.id
    });

    // Mettre à jour l'utilisateur
    await User.findByIdAndUpdate(req.user.id, {
      hasSensors: true,
      $push: { capteurs: capteur._id }
    });

    res.status(201).json({
      success: true,
      message: 'Capteur connecté avec succès.',
      data: { capteur }
    });
  } catch (error) {
    console.error('Erreur connectCapteur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion du capteur.',
      error: error.message
    });
  }
};

// @desc    Récupérer les capteurs de l'utilisateur
// @route   GET /api/capteurs
// @access  Private
exports.getCapteurs = async (req, res) => {
  try {
    const capteurs = await Capteur.find({ utilisateur: req.user.id });

    res.status(200).json({
      success: true,
      count: capteurs.length,
      data: { capteurs }
    });
  } catch (error) {
    console.error('Erreur getCapteurs:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des capteurs.',
      error: error.message
    });
  }
};

// @desc    Déconnecter un capteur
// @route   DELETE /api/capteurs/:id
// @access  Private
exports.disconnectCapteur = async (req, res) => {
  try {
    const capteur = await Capteur.findById(req.params.id);

    if (!capteur) {
      return res.status(404).json({
        success: false,
        message: 'Capteur introuvable.'
      });
    }

    // Vérifier que le capteur appartient à l'utilisateur
    if (capteur.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à déconnecter ce capteur.'
      });
    }

    await capteur.deleteOne();

    // Mettre à jour l'utilisateur
    const user = await User.findById(req.user.id);
    user.capteurs = user.capteurs.filter(c => c.toString() !== req.params.id);
    
    if (user.capteurs.length === 0) {
      user.hasSensors = false;
    }
    
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Capteur déconnecté avec succès.'
    });
  } catch (error) {
    console.error('Erreur disconnectCapteur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la déconnexion du capteur.',
      error: error.message
    });
  }
};

// @desc    Mettre à jour le statut d'un capteur
// @route   PUT /api/capteurs/:id/status
// @access  Private
exports.updateCapteurStatus = async (req, res) => {
  try {
    const { statut, batterie } = req.body;

    const capteur = await Capteur.findById(req.params.id);

    if (!capteur) {
      return res.status(404).json({
        success: false,
        message: 'Capteur introuvable.'
      });
    }

    if (capteur.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé.'
      });
    }

    if (statut) capteur.statut = statut;
    if (batterie !== undefined) capteur.batterie = batterie;
    capteur.derniereSynchronisation = Date.now();

    await capteur.save();

    res.status(200).json({
      success: true,
      message: 'Statut du capteur mis à jour.',
      data: { capteur }
    });
  } catch (error) {
    console.error('Erreur updateCapteurStatus:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du capteur.',
      error: error.message
    });
  }
};