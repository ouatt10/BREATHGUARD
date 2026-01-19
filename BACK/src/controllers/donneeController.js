const DonneeBiometrique = require('../models/DonneeBiometrique');
const TypeDonnee = require('../models/TypeDonnee'); 
const Capteur = require('../models/Capteur');
const { analyserDonneeBiometrique } = require('../middleware/alerteMiddleware');

/**
 * 📊 SEUILS POUR L'ANALYSE DES DONNÉES
*/
const SEUILS_ANALYSE = {
  spo2: {
    critique: { min: 0, max: 90, statut: 'critique', couleur: '#F44336', message: '🚨 SpO2 critique - Danger immédiat !' },
    attention: { min: 90, max: 94, statut: 'attention', couleur: '#FF9800', message: '⚠️ SpO2 légèrement bas' },
    normal: { min: 95, max: 100, statut: 'normal', couleur: '#4CAF50', message: '✅ SpO2 normal' }
  },
  frequence_respiratoire: {
    critique_bas: { min: 0, max: 8, statut: 'critique', couleur: '#F44336', message: '🚨 Fréquence respiratoire dangereusement basse !' },
    critique_haut: { min: 30, max: 100, statut: 'critique', couleur: '#F44336', message: '🚨 Fréquence respiratoire dangereusement élevée !' },
    attention_bas: { min: 8, max: 12, statut: 'attention', couleur: '#FF9800', message: '⚠️ Fréquence respiratoire un peu basse' },
    attention_haut: { min: 25, max: 30, statut: 'attention', couleur: '#FF9800', message: '⚠️ Fréquence respiratoire un peu élevée' },
    normal: { min: 12, max: 20, statut: 'normal', couleur: '#4CAF50', message: '✅ Fréquence respiratoire normale' }
  },
  frequence_cardiaque: {
    critique_bas: { min: 0, max: 40, statut: 'critique', couleur: '#F44336', message: '🚨 Fréquence cardiaque dangereusement basse !' },
    critique_haut: { min: 150, max: 300, statut: 'critique', couleur: '#F44336', message: '🚨 Fréquence cardiaque dangereusement élevée !' },
    attention_bas: { min: 40, max: 50, statut: 'attention', couleur: '#FF9800', message: '⚠️ Fréquence cardiaque un peu basse' },
    attention_haut: { min: 130, max: 150, statut: 'attention', couleur: '#FF9800', message: '⚠️ Fréquence cardiaque un peu élevée' },
    normal: { min: 60, max: 100, statut: 'normal', couleur: '#4CAF50', message: '✅ Fréquence cardiaque normale' }
  }
};

/**
 * 🧠 Analyser une valeur et retourner le statut/message/couleur
 */
const analyserValeur = (type, valeur) => {
  const seuils = SEUILS_ANALYSE[type];
  
  if (!seuils) {
    return {
      statut: 'normal',
      message: '✅ Donnée enregistrée',
      couleur: '#4CAF50'
    };
  }

  // Analyser selon le type
  for (const [key, seuil] of Object.entries(seuils)) {
    if (valeur >= seuil.min && valeur <= seuil.max) {
      return {
        statut: seuil.statut,
        message: seuil.message,
        couleur: seuil.couleur
      };
    }
  }

  // Par défaut
  return {
    statut: 'attention',
    message: '⚠️ Valeur inhabituelle',
    couleur: '#FF9800'
  };
};

/**
 * 🔋 Obtenir l'unité par défaut selon le type
 */
const getUniteParDefaut = (type) => {
  const unites = {
    spo2: '%',
    frequence_cardiaque: 'bpm',
    frequence_respiratoire: '/min',
    temperature: '°C',
    pression_arterielle_systolique: 'mmHg',
    pression_arterielle_diastolique: 'mmHg'
  };
  return unites[type] || '';
};

/**
 * 📝 Créer une nouvelle donnée biométrique (avec analyse automatique d'alerte)
 */
exports.creerDonneeBiometrique = async (req, res) => {
  try {
    const { type, valeur, unite, capteur } = req.body;
    const utilisateurId = req.user.id;

    // Validation
    if (!type || valeur === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Type et valeur sont requis'
      });
    }

    // Vérifier que le capteur appartient à l'utilisateur
    if (capteur) {
      const capteurExiste = await Capteur.findOne({
        _id: capteur,
        utilisateur: utilisateurId
      });

      if (!capteurExiste) {
        return res.status(403).json({
          success: false,
          message: 'Capteur non autorisé'
        });
      }
    }

    // 🧠 Analyser la valeur
    const analyse = analyserValeur(type, valeur);

    // Créer la donnée
    const donnee = await DonneeBiometrique.create({
      type,
      valeur,
      unite: unite || getUniteParDefaut(type),
      utilisateur: utilisateurId,
      capteur: capteur || null,
      statut: analyse.statut,
      message: analyse.message,
      couleur: analyse.couleur
    });

    // 🚨 ANALYSER ET CRÉER UNE ALERTE SI NÉCESSAIRE
    const alerte = await analyserDonneeBiometrique(donnee, utilisateurId);

    const response = {
      success: true,
      message: 'Donnée biométrique enregistrée avec succès',
      data: donnee
    };

    // Si une alerte a été créée, l'inclure dans la réponse
    if (alerte) {
      response.alerte = {
        id: alerte._id,
        type: alerte.type,
        priorite: alerte.priorite,
        titre: alerte.titre,
        message: alerte.message
      };
    }

    res.status(201).json(response);
  } catch (error) {
    console.error('Erreur création donnée:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement de la donnée',
      error: error.message
    });
  }
};

/**
 * 🆕 📤 Créer PLUSIEURS données biométriques en une seule requête
 * Parfait pour : données manuelles, capteurs IA, envois groupés
 */
exports.creerDonneesMultiples = async (req, res) => {
  try {
    const { spo2, frequenceCardiaque, frequenceRespiratoire, source, capteur } = req.body;
    const utilisateurId = req.user.id;

    console.log('📥 Réception données multiples:', { spo2, frequenceCardiaque, frequenceRespiratoire, source });

    // Vérifier qu'au moins une valeur est fournie
    if (!spo2 && !frequenceCardiaque && !frequenceRespiratoire) {
      return res.status(400).json({
        success: false,
        message: 'Au moins une valeur biométrique est requise'
      });
    }

    const donneesCreees = [];
    const alertesCreees = [];

    // 🔵 Traiter SpO2
    if (spo2 !== null && spo2 !== undefined) {
      const analyse = analyserValeur('spo2', spo2);
      const donnee = await DonneeBiometrique.create({
        type: 'spo2',
        valeur: spo2,
        unite: '%',
        utilisateur: utilisateurId,
        capteur: capteur || null,
        statut: analyse.statut,
        message: analyse.message,
        couleur: analyse.couleur,
        source: source || 'manuel'
      });
      donneesCreees.push(donnee);

      // Analyser pour alertes
      const alerte = await analyserDonneeBiometrique(donnee, utilisateurId);
      if (alerte) alertesCreees.push(alerte);
    }

    // 💓 Traiter Fréquence Cardiaque
    if (frequenceCardiaque !== null && frequenceCardiaque !== undefined) {
      const analyse = analyserValeur('frequence_cardiaque', frequenceCardiaque);
      const donnee = await DonneeBiometrique.create({
        type: 'frequence_cardiaque',
        valeur: frequenceCardiaque,
        unite: 'bpm',
        utilisateur: utilisateurId,
        capteur: capteur || null,
        statut: analyse.statut,
        message: analyse.message,
        couleur: analyse.couleur,
        source: source || 'manuel'
      });
      donneesCreees.push(donnee);

      // Analyser pour alertes
      const alerte = await analyserDonneeBiometrique(donnee, utilisateurId);
      if (alerte) alertesCreees.push(alerte);
    }

    // 🌬️ Traiter Fréquence Respiratoire
    if (frequenceRespiratoire !== null && frequenceRespiratoire !== undefined) {
      const analyse = analyserValeur('frequence_respiratoire', frequenceRespiratoire);
      const donnee = await DonneeBiometrique.create({
        type: 'frequence_respiratoire',
        valeur: frequenceRespiratoire,
        unite: '/min',
        utilisateur: utilisateurId,
        capteur: capteur || null,
        statut: analyse.statut,
        message: analyse.message,
        couleur: analyse.couleur,
        source: source || 'manuel'
      });
      donneesCreees.push(donnee);

      // Analyser pour alertes
      const alerte = await analyserDonneeBiometrique(donnee, utilisateurId);
      if (alerte) alertesCreees.push(alerte);
    }

    console.log(`✅ ${donneesCreees.length} données créées, ${alertesCreees.length} alertes générées`);

    const response = {
      success: true,
      message: `${donneesCreees.length} donnée(s) biométrique(s) enregistrée(s) avec succès`,
      data: donneesCreees,
      count: donneesCreees.length
    };

    // Ajouter les alertes si présentes
    if (alertesCreees.length > 0) {
      response.alertes = alertesCreees.map(a => ({
        id: a._id,
        type: a.type,
        priorite: a.priorite,
        titre: a.titre,
        message: a.message
      }));
    }

    res.status(201).json(response);
  } catch (error) {
    console.error('❌ Erreur création données multiples:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement des données',
      error: error.message
    });
  }
};

/**
 * 📊 Obtenir l'historique des données biométriques
 */
exports.getHistoriqueDonnees = async (req, res) => {
  try {
    const utilisateurId = req.user.id;
    const { type, limit = 50, page = 1 } = req.query;

    const filter = { utilisateur: utilisateurId };
    if (type) {
      filter.type = type;
    }

    const skip = (page - 1) * limit;

    const donnees = await DonneeBiometrique.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('capteur', 'idCapteur typeCapteur');

    const total = await DonneeBiometrique.countDocuments(filter);

    res.json({
      success: true,
      data: donnees,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Erreur récupération historique:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des données',
      error: error.message
    });
  }
};

/**
 * 📈 Obtenir les statistiques des données biométriques
 */
exports.getStatistiquesDonnees = async (req, res) => {
  try {
    const utilisateurId = req.user.id;
    const { type, periode = '7j' } = req.query;

    // Calculer la date de début selon la période
    const maintenant = new Date();
    let dateDebut;
    
    switch(periode) {
      case '24h':
        dateDebut = new Date(maintenant.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7j':
        dateDebut = new Date(maintenant.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30j':
        dateDebut = new Date(maintenant.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        dateDebut = new Date(maintenant.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const filter = {
      utilisateur: utilisateurId,
      createdAt: { $gte: dateDebut }
    };

    if (type) {
      filter.type = type;
    }

    // Agrégation pour obtenir les statistiques
    const stats = await DonneeBiometrique.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$type',
          moyenne: { $avg: '$valeur' },
          min: { $min: '$valeur' },
          max: { $max: '$valeur' },
          total: { $sum: 1 },
          derniereValeur: { $last: '$valeur' },
          critique: {
            $sum: { $cond: [{ $eq: ['$statut', 'critique'] }, 1, 0] }
          },
          attention: {
            $sum: { $cond: [{ $eq: ['$statut', 'attention'] }, 1, 0] }
          },
          normal: {
            $sum: { $cond: [{ $eq: ['$statut', 'normal'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      periode,
      data: stats
    });
  } catch (error) {
    console.error('Erreur calcul statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du calcul des statistiques',
      error: error.message
    });
  }
};

/**
 * 🗑️ Supprimer une donnée biométrique
 */
exports.supprimerDonnee = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateurId = req.user.id;

    const donnee = await DonneeBiometrique.findOne({
      _id: id,
      utilisateur: utilisateurId
    });

    if (!donnee) {
      return res.status(404).json({
        success: false,
        message: 'Donnée non trouvée'
      });
    }

    await donnee.deleteOne();

    res.json({
      success: true,
      message: 'Donnée supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur suppression donnée:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression',
      error: error.message
    });
  }
};

/**
 * 📊 Obtenir tous les types de données disponibles
 */
exports.getTypesDonnees = async (req, res) => {
  try {
    const types = await TypeDonnee.find().sort({ nom: 1 });
    
    res.status(200).json({
      success: true,
      count: types.length,
      data: types
    });
  } catch (error) {
    console.error('Erreur récupération types:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des types',
      error: error.message
    });
  }
};