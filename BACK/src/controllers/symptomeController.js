const Symptome = require('../models/Symptome');

// @desc    Déclarer un nouveau symptôme
// @route   POST /api/symptomes
// @access  Private
exports.ajouterSymptome = async (req, res) => {
  try {
    const { type, intensite, notes, duree, dateDebut } = req.body;

    // Validation
    if (!type || !intensite) {
      return res.status(400).json({
        success: false,
        message: 'Le type et l\'intensité du symptôme sont requis.'
      });
    }

    // Créer le symptôme
    const symptome = await Symptome.create({
      utilisateur: req.user.id,
      type,
      intensite,
      notes,
      duree,
      dateDebut: dateDebut || Date.now(),
      actif: true
    });

    res.status(201).json({
      success: true,
      message: 'Symptôme enregistré avec succès.',
      data: { symptome }
    });
  } catch (error) {
    console.error('Erreur ajouterSymptome:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement du symptôme.',
      error: error.message
    });
  }
};

// @desc    Récupérer l'historique des symptômes
// @route   GET /api/symptomes
// @access  Private
exports.getSymptomes = async (req, res) => {
  try {
    const { type, intensite, actif, dateDebut, dateFin, limit = 50 } = req.query;

    // Construire la requête
    const query = { utilisateur: req.user.id };

    if (type) query.type = type;
    if (intensite) query.intensite = intensite;
    if (actif !== undefined) query.actif = actif === 'true';

    if (dateDebut || dateFin) {
      query.horodatage = {};
      if (dateDebut) query.horodatage.$gte = new Date(dateDebut);
      if (dateFin) query.horodatage.$lte = new Date(dateFin);
    }

    // Récupérer les symptômes
    const symptomes = await Symptome.find(query)
      .sort({ horodatage: -1 })
      .limit(parseInt(limit));

    // Statistiques
    const stats = {
      total: symptomes.length,
      parType: {},
      parIntensite: {
        legere: 0,
        moderee: 0,
        severe: 0
      }
    };

    symptomes.forEach(s => {
      // Compter par type
      stats.parType[s.type] = (stats.parType[s.type] || 0) + 1;
      // Compter par intensité
      stats.parIntensite[s.intensite]++;
    });

    res.status(200).json({
      success: true,
      count: symptomes.length,
      data: { symptomes, stats }
    });
  } catch (error) {
    console.error('Erreur getSymptomes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des symptômes.',
      error: error.message
    });
  }
};

// @desc    Récupérer un symptôme par ID
// @route   GET /api/symptomes/:id
// @access  Private
exports.getSymptomeById = async (req, res) => {
  try {
    const symptome = await Symptome.findById(req.params.id);

    if (!symptome) {
      return res.status(404).json({
        success: false,
        message: 'Symptôme introuvable.'
      });
    }

    // Vérifier que le symptôme appartient à l'utilisateur
    if (symptome.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé.'
      });
    }

    res.status(200).json({
      success: true,
      data: { symptome }
    });
  } catch (error) {
    console.error('Erreur getSymptomeById:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du symptôme.',
      error: error.message
    });
  }
};

// @desc    Mettre à jour un symptôme
// @route   PUT /api/symptomes/:id
// @access  Private
exports.updateSymptome = async (req, res) => {
  try {
    let symptome = await Symptome.findById(req.params.id);

    if (!symptome) {
      return res.status(404).json({
        success: false,
        message: 'Symptôme introuvable.'
      });
    }

    // Vérifier que le symptôme appartient à l'utilisateur
    if (symptome.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé.'
      });
    }

    // Mettre à jour
    const { intensite, notes, duree, dateFin, actif } = req.body;

    if (intensite) symptome.intensite = intensite;
    if (notes !== undefined) symptome.notes = notes;
    if (duree) symptome.duree = duree;
    if (dateFin) symptome.dateFin = dateFin;
    if (actif !== undefined) symptome.actif = actif;

    await symptome.save();

    res.status(200).json({
      success: true,
      message: 'Symptôme mis à jour avec succès.',
      data: { symptome }
    });
  } catch (error) {
    console.error('Erreur updateSymptome:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du symptôme.',
      error: error.message
    });
  }
};

// @desc    Marquer un symptôme comme terminé
// @route   PUT /api/symptomes/:id/terminer
// @access  Private
exports.terminerSymptome = async (req, res) => {
  try {
    const symptome = await Symptome.findById(req.params.id);

    if (!symptome) {
      return res.status(404).json({
        success: false,
        message: 'Symptôme introuvable.'
      });
    }

    // Vérifier que le symptôme appartient à l'utilisateur
    if (symptome.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé.'
      });
    }

    symptome.actif = false;
    symptome.dateFin = Date.now();

    await symptome.save();

    res.status(200).json({
      success: true,
      message: 'Symptôme marqué comme terminé.',
      data: { symptome }
    });
  } catch (error) {
    console.error('Erreur terminerSymptome:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du symptôme.',
      error: error.message
    });
  }
};

// @desc    Supprimer un symptôme
// @route   DELETE /api/symptomes/:id
// @access  Private
exports.deleteSymptome = async (req, res) => {
  try {
    const symptome = await Symptome.findById(req.params.id);

    if (!symptome) {
      return res.status(404).json({
        success: false,
        message: 'Symptôme introuvable.'
      });
    }

    // Vérifier que le symptôme appartient à l'utilisateur
    if (symptome.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé.'
      });
    }

    await symptome.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Symptôme supprimé avec succès.'
    });
  } catch (error) {
    console.error('Erreur deleteSymptome:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du symptôme.',
      error: error.message
    });
  }
};