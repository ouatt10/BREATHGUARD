const Alerte = require('../models/Alerte');

/**
 * 🚨 SEUILS CRITIQUES ET URGENTS
 */
const SEUILS = {
  spo2: {
    critique: 90,    // < 90% = critique
    attention: 94,   // < 94% = attention
    normal: 95       // >= 95% = normal
  },
  frequence_respiratoire: {
    min_critique: 8,     // < 8/min = critique
    max_critique: 30,    // > 30/min = critique
    min_attention: 12,   // < 12/min = attention
    max_attention: 25,   // > 25/min = attention
    min_normal: 12,      // >= 12/min
    max_normal: 20       // <= 20/min = normal
  },
  frequence_cardiaque: {
    min_critique: 40,    // < 40 bpm = critique
    max_critique: 150,   // > 150 bpm = critique
    min_attention: 50,   // < 50 bpm = attention
    max_attention: 130,  // > 130 bpm = attention
    min_normal: 60,      // >= 60 bpm
    max_normal: 100      // <= 100 bpm = normal
  },
  batterie: {
    critique: 10,    // < 10% = critique
    attention: 20    // < 20% = attention
  }
};

/**
 * 🔍 Analyser une donnée biométrique et créer une alerte si nécessaire
 */
const analyserDonneeBiometrique = async (donnee, utilisateurId) => {
  try {
    const { type, valeur } = donnee;
    let alerteData = null;

    // 🫁 ANALYSE SpO2
    if (type === 'spo2') {
      if (valeur < SEUILS.spo2.critique) {
        alerteData = {
          type: 'donnee_critique',
          priorite: 'critique',
          titre: '🚨 SpO2 Critique',
          message: `Saturation en oxygène dangereusement basse : ${valeur}%. Niveau normal : ≥ 95%. Intervention immédiate requise !`,
          donneesConcernees: {
            type: 'spo2',
            valeur: valeur,
            seuil: SEUILS.spo2.critique
          }
        };
      } else if (valeur < SEUILS.spo2.attention) {
        alerteData = {
          type: 'donnee_anormale',
          priorite: 'urgent',
          titre: '⚠️ SpO2 Bas',
          message: `Saturation en oxygène en dessous de la normale : ${valeur}%. Niveau recommandé : ≥ 95%. Surveillance nécessaire.`,
          donneesConcernees: {
            type: 'spo2',
            valeur: valeur,
            seuil: SEUILS.spo2.attention
          }
        };
      }
    }

    // 🫀 ANALYSE FRÉQUENCE CARDIAQUE
    if (type === 'frequence_cardiaque') {
      if (valeur < SEUILS.frequence_cardiaque.min_critique) {
        alerteData = {
          type: 'donnee_critique',
          priorite: 'critique',
          titre: '🚨 Bradycardie Sévère',
          message: `Fréquence cardiaque dangereusement basse : ${valeur} bpm. Niveau normal : 60-100 bpm. Intervention immédiate requise !`,
          donneesConcernees: {
            type: 'frequence_cardiaque',
            valeur: valeur,
            seuil: SEUILS.frequence_cardiaque.min_critique
          }
        };
      } else if (valeur > SEUILS.frequence_cardiaque.max_critique) {
        alerteData = {
          type: 'donnee_critique',
          priorite: 'critique',
          titre: '🚨 Tachycardie Sévère',
          message: `Fréquence cardiaque dangereusement élevée : ${valeur} bpm. Niveau normal : 60-100 bpm. Intervention immédiate requise !`,
          donneesConcernees: {
            type: 'frequence_cardiaque',
            valeur: valeur,
            seuil: SEUILS.frequence_cardiaque.max_critique
          }
        };
      } else if (valeur < SEUILS.frequence_cardiaque.min_attention) {
        alerteData = {
          type: 'donnee_anormale',
          priorite: 'urgent',
          titre: '⚠️ Fréquence Cardiaque Basse',
          message: `Fréquence cardiaque en dessous de la normale : ${valeur} bpm. Niveau recommandé : 60-100 bpm. Surveillance nécessaire.`,
          donneesConcernees: {
            type: 'frequence_cardiaque',
            valeur: valeur,
            seuil: SEUILS.frequence_cardiaque.min_attention
          }
        };
      } else if (valeur > SEUILS.frequence_cardiaque.max_attention) {
        alerteData = {
          type: 'donnee_anormale',
          priorite: 'urgent',
          titre: '⚠️ Fréquence Cardiaque Élevée',
          message: `Fréquence cardiaque au-dessus de la normale : ${valeur} bpm. Niveau recommandé : 60-100 bpm. Surveillance nécessaire.`,
          donneesConcernees: {
            type: 'frequence_cardiaque',
            valeur: valeur,
            seuil: SEUILS.frequence_cardiaque.max_attention
          }
        };
      }
    }

    // 🌬️ ANALYSE FRÉQUENCE RESPIRATOIRE
    if (type === 'frequence_respiratoire') {
      if (valeur < SEUILS.frequence_respiratoire.min_critique) {
        alerteData = {
          type: 'donnee_critique',
          priorite: 'critique',
          titre: '🚨 Bradypnée Sévère',
          message: `Fréquence respiratoire dangereusement basse : ${valeur}/min. Niveau normal : 12-20/min. Intervention immédiate requise !`,
          donneesConcernees: {
            type: 'frequence_respiratoire',
            valeur: valeur,
            seuil: SEUILS.frequence_respiratoire.min_critique
          }
        };
      } else if (valeur > SEUILS.frequence_respiratoire.max_critique) {
        alerteData = {
          type: 'donnee_critique',
          priorite: 'critique',
          titre: '🚨 Tachypnée Sévère',
          message: `Fréquence respiratoire dangereusement élevée : ${valeur}/min. Niveau normal : 12-20/min. Intervention immédiate requise !`,
          donneesConcernees: {
            type: 'frequence_respiratoire',
            valeur: valeur,
            seuil: SEUILS.frequence_respiratoire.max_critique
          }
        };
      } else if (valeur < SEUILS.frequence_respiratoire.min_attention) {
        alerteData = {
          type: 'donnee_anormale',
          priorite: 'urgent',
          titre: '⚠️ Fréquence Respiratoire Basse',
          message: `Fréquence respiratoire en dessous de la normale : ${valeur}/min. Niveau recommandé : 12-20/min. Surveillance nécessaire.`,
          donneesConcernees: {
            type: 'frequence_respiratoire',
            valeur: valeur,
            seuil: SEUILS.frequence_respiratoire.min_attention
          }
        };
      } else if (valeur > SEUILS.frequence_respiratoire.max_attention) {
        alerteData = {
          type: 'donnee_anormale',
          priorite: 'urgent',
          titre: '⚠️ Fréquence Respiratoire Élevée',
          message: `Fréquence respiratoire au-dessus de la normale : ${valeur}/min. Niveau recommandé : 12-20/min. Surveillance nécessaire.`,
          donneesConcernees: {
            type: 'frequence_respiratoire',
            valeur: valeur,
            seuil: SEUILS.frequence_respiratoire.max_attention
          }
        };
      }
    }

    // 📊 Si une alerte doit être créée
    if (alerteData) {
      // Vérifier si une alerte similaire non lue existe déjà (éviter les doublons)
      const alerteExistante = await Alerte.findOne({
        utilisateur: utilisateurId,
        type: alerteData.type,
        'donneesConcernees.type': alerteData.donneesConcernees.type,
        lue: false,
        createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) } // Dans les 30 dernières minutes
      });

      if (!alerteExistante) {
        // Créer la nouvelle alerte
        const nouvelleAlerte = await Alerte.create({
          ...alerteData,
          utilisateur: utilisateurId,
          donneeBiometrique: donnee._id
        });

        console.log(`🚨 Alerte créée automatiquement : ${alerteData.titre} pour utilisateur ${utilisateurId}`);
        
        return nouvelleAlerte;
      } else {
        console.log(`ℹ️ Alerte similaire déjà existante, pas de doublon créé`);
      }
    }

    return null;
  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse de la donnée:', error);
    return null;
  }
};

/**
 * 🔋 Analyser la batterie d'un capteur et créer une alerte si nécessaire
 */
const analyserBatterieCapteur = async (capteur) => {
  try {
    const { batterie, utilisateur } = capteur;
    let alerteData = null;

    if (batterie < SEUILS.batterie.critique) {
      alerteData = {
        type: 'batterie_faible',
        priorite: 'urgent',
        titre: '🔋 Batterie Critique',
        message: `La batterie de votre capteur est très faible : ${batterie}%. Rechargez immédiatement pour éviter toute interruption de surveillance.`,
        capteur: capteur._id
      };
    } else if (batterie < SEUILS.batterie.attention) {
      alerteData = {
        type: 'batterie_faible',
        priorite: 'moyen',
        titre: '🔋 Batterie Faible',
        message: `La batterie de votre capteur est faible : ${batterie}%. Pensez à le recharger prochainement.`,
        capteur: capteur._id
      };
    }

    if (alerteData) {
      // Vérifier si une alerte similaire existe déjà
      const alerteExistante = await Alerte.findOne({
        utilisateur: utilisateur,
        type: 'batterie_faible',
        capteur: capteur._id,
        lue: false,
        createdAt: { $gte: new Date(Date.now() - 2 * 60 * 60 * 1000) } // Dans les 2 dernières heures
      });

      if (!alerteExistante) {
        const nouvelleAlerte = await Alerte.create({
          ...alerteData,
          utilisateur: utilisateur
        });

        console.log(`🔋 Alerte batterie créée : ${batterie}% pour capteur ${capteur.idCapteur}`);
        
        return nouvelleAlerte;
      }
    }

    return null;
  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse de la batterie:', error);
    return null;
  }
};

module.exports = {
  analyserDonneeBiometrique,
  analyserBatterieCapteur,
  SEUILS
};