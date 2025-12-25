class AnalyseurBiometrique {
  
  static analyserSpO2(valeur, user = {}) {
    const { pathologies = [] } = user;
    let statut, niveau, message, recommandation, couleur;
    
    if (valeur < 85) {
      statut = 'critique';
      niveau = 5;
      message = '🚨 DANGER : SpO2 extrêmement bas !';
      recommandation = 'URGENCE MÉDICALE IMMÉDIATE. Appelez le 15 ou rendez-vous aux urgences.';
      couleur = '#D32F2F';
    }
    else if (valeur < 90) {
      statut = 'critique';
      niveau = 4;
      message = '⚠️ ALERTE : SpO2 critique';
      recommandation = 'Consultez rapidement un médecin. Asseyez-vous, respirez calmement.';
      couleur = '#F44336';
    }
    else if (valeur < 92) {
      statut = 'attention';
      niveau = 3;
      message = '⚠️ SpO2 préoccupant';
      recommandation = 'Surveillez votre respiration. Si ça persiste, contactez votre médecin.';
      couleur = '#FF9800';
    }
    else if (valeur < 95) {
      if (pathologies.includes('asthme') || pathologies.includes('bpco')) {
        statut = 'acceptable';
        niveau = 2;
        message = '📊 SpO2 acceptable pour votre condition';
        recommandation = 'Continuez votre traitement habituel.';
        couleur = '#FFC107';
      } else {
        statut = 'attention';
        niveau = 2;
        message = '⚠️ SpO2 légèrement bas';
        recommandation = 'Vérifiez votre respiration. Prenez de l\'air frais si possible.';
        couleur = '#FF9800';
      }
    }
    else if (valeur <= 100) {
      statut = 'normal';
      niveau = 1;
      message = '✅ SpO2 normal';
      recommandation = 'Continuez ainsi ! Votre oxygénation est excellente.';
      couleur = '#4CAF50';
    }
    else {
      statut = 'erreur';
      niveau = 0;
      message = '⚠️ Erreur de mesure possible';
      recommandation = 'Vérifiez le capteur et réessayez la mesure.';
      couleur = '#9E9E9E';
    }
    
    return { statut, niveau, message, recommandation, couleur, valeur };
  }

  static analyserFrequenceRespiratoire(valeur, user = {}) {
    const { age = 30 } = user;
    let statut, niveau, message, recommandation, couleur;
    let minNormal, maxNormal;
    
    if (age < 1) {
      minNormal = 30; maxNormal = 60;
    } else if (age < 3) {
      minNormal = 24; maxNormal = 40;
    } else if (age < 12) {
      minNormal = 18; maxNormal = 30;
    } else {
      minNormal = 12; maxNormal = 20;
    }
    
    if (valeur < 8 || valeur > 30) {
      statut = 'critique';
      niveau = 5;
      message = '🚨 DANGER : Fréquence respiratoire anormale !';
      recommandation = 'URGENCE MÉDICALE. Appelez le 15 immédiatement.';
      couleur = '#D32F2F';
    }
    else if (valeur < minNormal - 2 || valeur > maxNormal + 5) {
      statut = 'critique';
      niveau = 4;
      message = '⚠️ ALERTE : Fréquence respiratoire préoccupante';
      recommandation = 'Consultez rapidement un médecin.';
      couleur = '#F44336';
    }
    else if (valeur < minNormal || valeur > maxNormal) {
      statut = 'attention';
      niveau = 3;
      message = '⚠️ Fréquence respiratoire inhabituelle';
      recommandation = 'Restez au repos. Surveillez votre respiration.';
      couleur = '#FF9800';
    }
    else {
      statut = 'normal';
      niveau = 1;
      message = '✅ Fréquence respiratoire normale';
      recommandation = `Excellente respiration (normal: ${minNormal}-${maxNormal}/min).`;
      couleur = '#4CAF50';
    }
    
    return { statut, niveau, message, recommandation, couleur, valeur };
  }

  static analyserFrequenceCardiaque(valeur, user = {}) {
    const { age = 30 } = user;
    let statut, niveau, message, recommandation, couleur;
    let minNormal = 60, maxNormal = 100;
    
    if (age < 1) {
      minNormal = 100; maxNormal = 160;
    } else if (age < 5) {
      minNormal = 80; maxNormal = 140;
    } else if (age < 12) {
      minNormal = 70; maxNormal = 120;
    } else if (age > 60) {
      minNormal = 50; maxNormal = 90;
    }
    
    if (valeur < 30 || valeur > 200) {
      statut = 'critique';
      niveau = 5;
      message = '🚨 DANGER : Fréquence cardiaque dangereuse !';
      recommandation = 'URGENCE MÉDICALE IMMÉDIATE. Appelez le 15.';
      couleur = '#D32F2F';
    }
    else if (valeur < 40 || valeur > 140) {
      statut = 'critique';
      niveau = 4;
      message = '⚠️ ALERTE : Fréquence cardiaque anormale';
      recommandation = 'Consultez rapidement un médecin.';
      couleur = '#F44336';
    }
    else if (valeur < minNormal || valeur > maxNormal) {
      statut = 'attention';
      niveau = 3;
      message = '⚠️ Fréquence cardiaque inhabituelle';
      recommandation = 'Restez au calme. Surveillez votre rythme.';
      couleur = '#FF9800';
    }
    else {
      statut = 'normal';
      niveau = 1;
      message = '✅ Fréquence cardiaque normale';
      recommandation = `Excellent rythme cardiaque (normal: ${minNormal}-${maxNormal} bpm).`;
      couleur = '#4CAF50';
    }
    
    return { statut, niveau, message, recommandation, couleur, valeur };
  }
}

module.exports = AnalyseurBiometrique;
