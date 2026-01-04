const Capteur = require('../models/Capteur');
const { analyserBatterieCapteur } = require('../middleware/alerteMiddleware');

/**
 * ✅ Ajouter/Enregistrer un nouveau capteur
 */
exports.ajouterCapteur = async (req, res) => {
  try {
    const { idCapteur, typeCapteur } = req.body;
    const utilisateurId = req.user.id;

    // Validation
    if (!idCapteur || !typeCapteur) {
      return res.status(400).json({
        success: false,
        message: 'ID du capteur et type sont requis'
      });
    }

    // Vérifier si le capteur existe déjà
    const capteurExiste = await Capteur.findOne({ idCapteur });

    if (capteurExiste) {
      // Si le capteur appartient déjà à cet utilisateur
      if (capteurExiste.utilisateur.toString() === utilisateurId) {
        return res.status(400).json({
          success: false,
          message: 'Ce capteur est déjà enregistré pour votre compte'
        });
      }
      
      // Si le capteur appartient à un autre utilisateur
      return res.status(403).json({
        success: false,
        message: 'Ce capteur est déjà associé à un autre compte'
      });
    }

    // Créer le nouveau capteur
    const capteur = await Capteur.create({
      idCapteur,
      typeCapteur,
      utilisateur: utilisateurId,
      dateActivation: new Date(),
      derniereSynchronisation: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Capteur enregistré avec succès',
      data: capteur
    });
  } catch (error) {
    console.error('Erreur ajout capteur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement du capteur',
      error: error.message
    });
  }
};

/**
 * 📋 Obtenir tous les capteurs de l'utilisateur
 */
exports.getMesCapteurs = async (req, res) => {
  try {
    const utilisateurId = req.user.id;

    const capteurs = await Capteur.find({ utilisateur: utilisateurId })
      .sort({ dateActivation: -1 });

    res.json({
      success: true,
      data: capteurs
    });
  } catch (error) {
    console.error('Erreur récupération capteurs:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des capteurs',
      error: error.message
    });
  }
};

/**
 * 🔄 Mettre à jour le statut d'un capteur (avec analyse batterie)
 */
exports.mettreAJourCapteur = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, batterie } = req.body;
    const utilisateurId = req.user.id;

    const capteur = await Capteur.findOne({
      _id: id,
      utilisateur: utilisateurId
    });

    if (!capteur) {
      return res.status(404).json({
        success: false,
        message: 'Capteur non trouvé'
      });
    }

    // Mettre à jour les champs
    if (statut) capteur.statut = statut;
    if (batterie !== undefined) capteur.batterie = batterie;
    capteur.derniereSynchronisation = new Date();

    await capteur.save();

    // 🔋 ANALYSER LA BATTERIE ET CRÉER UNE ALERTE SI NÉCESSAIRE
    let alerte = null;
    if (batterie !== undefined) {
      alerte = await analyserBatterieCapteur(capteur);
    }

    const response = {
      success: true,
      message: 'Capteur mis à jour avec succès',
      data: capteur
    };

    // Si une alerte batterie a été créée
    if (alerte) {
      response.alerte = {
        id: alerte._id,
        type: alerte.type,
        priorite: alerte.priorite,
        titre: alerte.titre,
        message: alerte.message
      };
    }

    res.json(response);
  } catch (error) {
    console.error('Erreur mise à jour capteur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du capteur',
      error: error.message
    });
  }
};

/**
 * 🗑️ Supprimer un capteur
 */
exports.supprimerCapteur = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateurId = req.user.id;

    const capteur = await Capteur.findOne({
      _id: id,
      utilisateur: utilisateurId
    });

    if (!capteur) {
      return res.status(404).json({
        success: false,
        message: 'Capteur non trouvé'
      });
    }

    await capteur.deleteOne();

    res.json({
      success: true,
      message: 'Capteur supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur suppression capteur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression',
      error: error.message
    });
  }
};