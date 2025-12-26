const Alerte = require('../models/Alerte');

// @desc    Récupérer toutes les alertes de l'utilisateur
// @route   GET /api/alertes
// @access  Private
exports.getAlertes = async (req, res) => {
  try {
    const { lue, type, priorite, limit = 50 } = req.query;

    // Construire la requête
    const query = { utilisateur: req.user.id };

    if (lue !== undefined) query.lue = lue === 'true';
    if (type) query.type = type;
    if (priorite) query.priorite = priorite;

    // Récupérer les alertes
    const alertes = await Alerte.find(query)
      .sort({ horodatage: -1 })
      .limit(parseInt(limit))
      .populate('donnees.donneeBiometrique')
      .populate('donnees.symptome')
      .populate('donnees.capteur');

    // Statistiques
    const stats = {
      total: alertes.length,
      nonLues: alertes.filter(a => !a.lue).length,
      parPriorite: {
        info: alertes.filter(a => a.priorite === 'info').length,
        attention: alertes.filter(a => a.priorite === 'attention').length,
        urgent: alertes.filter(a => a.priorite === 'urgent').length,
        critique: alertes.filter(a => a.priorite === 'critique').length
      }
    };

    res.status(200).json({
      success: true,
      count: alertes.length,
      data: { alertes, stats }
    });
  } catch (error) {
    console.error('Erreur getAlertes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des alertes.',
      error: error.message
    });
  }
};

// @desc    Créer une alerte manuellement (pour tests ou cas spéciaux)
// @route   POST /api/alertes
// @access  Private
exports.creerAlerte = async (req, res) => {
  try {
    const { type, priorite, titre, message, donnees } = req.body;

    // Validation
    if (!type || !priorite || !titre || !message) {
      return res.status(400).json({
        success: false,
        message: 'Type, priorité, titre et message sont requis.'
      });
    }

    // Créer l'alerte
    const alerte = await Alerte.create({
      utilisateur: req.user.id,
      type,
      priorite,
      titre,
      message,
      donnees
    });

    res.status(201).json({
      success: true,
      message: 'Alerte créée avec succès.',
      data: { alerte }
    });
  } catch (error) {
    console.error('Erreur creerAlerte:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'alerte.',
      error: error.message
    });
  }
};

// @desc    Marquer une alerte comme lue
// @route   PUT /api/alertes/:id/lire
// @access  Private
exports.marquerCommeLue = async (req, res) => {
  try {
    const alerte = await Alerte.findById(req.params.id);

    if (!alerte) {
      return res.status(404).json({
        success: false,
        message: 'Alerte introuvable.'
      });
    }

    // Vérifier que l'alerte appartient à l'utilisateur
    if (alerte.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé.'
      });
    }

    alerte.lue = true;
    alerte.dateLecture = Date.now();

    await alerte.save();

    res.status(200).json({
      success: true,
      message: 'Alerte marquée comme lue.',
      data: { alerte }
    });
  } catch (error) {
    console.error('Erreur marquerCommeLue:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'alerte.',
      error: error.message
    });
  }
};

// @desc    Marquer toutes les alertes comme lues
// @route   PUT /api/alertes/lire-tout
// @access  Private
exports.marquerToutCommeLu = async (req, res) => {
  try {
    const result = await Alerte.updateMany(
      { utilisateur: req.user.id, lue: false },
      { lue: true, dateLecture: Date.now() }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} alerte(s) marquée(s) comme lue(s).`,
      data: { count: result.modifiedCount }
    });
  } catch (error) {
    console.error('Erreur marquerToutCommeLu:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour des alertes.',
      error: error.message
    });
  }
};

// @desc    Supprimer une alerte
// @route   DELETE /api/alertes/:id
// @access  Private
exports.deleteAlerte = async (req, res) => {
  try {
    const alerte = await Alerte.findById(req.params.id);

    if (!alerte) {
      return res.status(404).json({
        success: false,
        message: 'Alerte introuvable.'
      });
    }

    // Vérifier que l'alerte appartient à l'utilisateur
    if (alerte.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé.'
      });
    }

    await alerte.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Alerte supprimée avec succès.'
    });
  } catch (error) {
    console.error('Erreur deleteAlerte:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'alerte.',
      error: error.message
    });
  }
};

// @desc    Récupérer les alertes non lues
// @route   GET /api/alertes/non-lues
// @access  Private
exports.getAlertesNonLues = async (req, res) => {
  try {
    const alertes = await Alerte.find({
      utilisateur: req.user.id,
      lue: false
    })
      .sort({ horodatage: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: alertes.length,
      data: { alertes }
    });
  } catch (error) {
    console.error('Erreur getAlertesNonLues:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des alertes non lues.',
      error: error.message
    });
  }
};