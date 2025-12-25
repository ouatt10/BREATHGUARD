const DonneeBiometrique = require('../models/DonneeBiometrique');
const DonneeEnvironnementale = require('../models/DonneeEnvironnementale');
const Capteur = require('../models/Capteur');
const User = require('../models/User');
const AnalyseurBiometrique = require('../utils/analyseDonnees');

// @desc    Recevoir des données biométriques depuis un capteur
// @route   POST /api/donnees/biometriques
// @access  Private
exports.addDonneeBiometrique = async (req, res) => {
  try {
    const { capteurId, donnees } = req.body;

    if (!capteurId || !donnees || !Array.isArray(donnees)) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides. Format attendu: { capteurId, donnees: [...] }'
      });
    }

    // Vérifier que le capteur appartient à l'utilisateur
    const capteur = await Capteur.findById(capteurId);
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

    // Récupérer les infos utilisateur pour l'analyse
    const utilisateur = await User.findById(req.user.id);

    // Analyse intelligente des données
    const donneesCreated = await Promise.all(
      donnees.map(async (d) => {
        let analyse;
        
        if (d.type === 'spo2') {
          analyse = AnalyseurBiometrique.analyserSpO2(d.valeur, {
            age: utilisateur.age,
            pathologies: utilisateur.pathologies
          });
        } else if (d.type === 'frequenceRespiratoire') {
          analyse = AnalyseurBiometrique.analyserFrequenceRespiratoire(d.valeur, {
            age: utilisateur.age
          });
        } else if (d.type === 'frequenceCardiaque') {
          analyse = AnalyseurBiometrique.analyserFrequenceCardiaque(d.valeur, {
            age: utilisateur.age
          });
        }

        return await DonneeBiometrique.create({
          utilisateur: req.user.id,
          capteur: capteurId,
          type: d.type,
          valeur: d.valeur,
          unite: d.unite,
          statut: analyse.statut,
          niveau: analyse.niveau,
          message: analyse.message,
          recommandation: analyse.recommandation,
          couleur: analyse.couleur
        });
      })
    );

    // Mettre à jour la dernière synchronisation du capteur
    capteur.derniereSynchronisation = Date.now();
    if (req.body.batterie !== undefined) {
      capteur.batterie = req.body.batterie;
    }
    await capteur.save();

    res.status(201).json({
      success: true,
      message: 'Données biométriques enregistrées.',
      data: { donnees: donneesCreated }
    });
  } catch (error) {
    console.error('Erreur addDonneeBiometrique:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement des données.',
      error: error.message
    });
  }
};

// @desc    Récupérer les dernières données biométriques (temps réel)
// @route   GET /api/donnees/biometriques/realtime
// @access  Private
exports.getDonneesRealtime = async (req, res) => {
  try {
    const types = ['spo2', 'frequenceRespiratoire', 'frequenceCardiaque'];
    
    const donnees = await Promise.all(
      types.map(async (type) => {
        return await DonneeBiometrique.findOne({
          utilisateur: req.user.id,
          type
        }).sort({ horodatage: -1 });
      })
    );

    res.status(200).json({
      success: true,
      data: {
        spo2: donnees[0],
        frequenceRespiratoire: donnees[1],
        frequenceCardiaque: donnees[2],
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Erreur getDonneesRealtime:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des données.',
      error: error.message
    });
  }
};

// @desc    Récupérer l'historique des données biométriques
// @route   GET /api/donnees/biometriques/historique
// @access  Private
exports.getHistorique = async (req, res) => {
  try {
    const { type, dateDebut, dateFin, limit = 100 } = req.query;

    const query = { utilisateur: req.user.id };
    
    if (type) {
      query.type = type;
    }

    if (dateDebut || dateFin) {
      query.horodatage = {};
      if (dateDebut) query.horodatage.$gte = new Date(dateDebut);
      if (dateFin) query.horodatage.$lte = new Date(dateFin);
    }

    const donnees = await DonneeBiometrique.find(query)
      .sort({ horodatage: -1 })
      .limit(parseInt(limit))
      .populate('capteur', 'idCapteur typeCapteur');

    // Calculer des statistiques
    const stats = {};
    if (donnees.length > 0) {
      const valeurs = donnees.map(d => d.valeur);
      stats.moyenne = (valeurs.reduce((a, b) => a + b, 0) / valeurs.length).toFixed(2);
      stats.min = Math.min(...valeurs);
      stats.max = Math.max(...valeurs);
      stats.count = donnees.length;
    }

    res.status(200).json({
      success: true,
      count: donnees.length,
      data: { donnees, stats }
    });
  } catch (error) {
    console.error('Erreur getHistorique:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'historique.',
      error: error.message
    });
  }
};

// @desc    Ajouter des données environnementales (depuis capteur local)
// @route   POST /api/donnees/environnementales
// @access  Private
exports.addDonneeEnvironnementale = async (req, res) => {
  try {
    const { capteurId, temperature, humidite, co2, localisation } = req.body;

    if (!capteurId) {
      return res.status(400).json({
        success: false,
        message: 'ID du capteur requis.'
      });
    }

    const capteur = await Capteur.findById(capteurId);
    if (!capteur || capteur.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé.'
      });
    }

    const donnee = await DonneeEnvironnementale.create({
      localisation: localisation || {
        type: 'Point',
        coordinates: [0, 0],
        ville: 'Inconnue'
      },
      temperature,
      humidite,
      pollution: { co2 },
      source: 'capteur',
      capteur: capteurId
    });

    res.status(201).json({
      success: true,
      message: 'Données environnementales enregistrées.',
      data: { donnee }
    });
  } catch (error) {
    console.error('Erreur addDonneeEnvironnementale:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement.',
      error: error.message
    });
  }
};