import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUser } from '../../src/context/UserContext';

export default function DataScreen() {
  const { hasSensors } = useUser();
  const [activeTab, setActiveTab] = useState('realtime');

  // Si pas de capteurs, afficher interface simplifiée
  if (!hasSensors) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mes Données</Text>
        </View>

        <ScrollView style={styles.content}>
          {/* Message informatif */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoTitle}>Suivi environnemental uniquement</Text>
            <Text style={styles.infoText}>
              Sans capteurs, vous pouvez suivre la qualité de l'air et déclarer vos symptômes manuellement.
            </Text>
          </View>

          {/* Section Déclarer symptômes */}
          <Text style={styles.sectionTitle}>📝 Journal de Santé</Text>
          
          <TouchableOpacity style={styles.symptomButton}>
            <Text style={styles.symptomButtonIcon}>➕</Text>
            <View style={styles.symptomButtonContent}>
              <Text style={styles.symptomButtonTitle}>Déclarer des symptômes</Text>
              <Text style={styles.symptomButtonSubtitle}>Notez comment vous vous sentez</Text>
            </View>
            <Text style={styles.symptomButtonArrow}>›</Text>
          </TouchableOpacity>

          {/* Historique des symptômes déclarés */}
          <Text style={styles.sectionTitle}>Symptômes récents</Text>
          
          <View style={styles.symptomHistoryCard}>
            <View style={styles.symptomHistoryHeader}>
              <Text style={styles.symptomHistoryDate}>Aujourd'hui, 14:30</Text>
              <View style={[styles.symptomSeverity, { backgroundColor: '#F0AD4E' }]}>
                <Text style={styles.symptomSeverityText}>Modéré</Text>
              </View>
            </View>
            <View style={styles.symptomList}>
              <Text style={styles.symptomItem}>😮‍💨 Essoufflement</Text>
              <Text style={styles.symptomItem}>🤧 Éternuements</Text>
            </View>
            <Text style={styles.symptomNote}>Note : Après promenade au parc</Text>
            <Text style={styles.symptomEnv}>AQI : 85 • Pollen : Élevé</Text>
          </View>

          <View style={styles.symptomHistoryCard}>
            <View style={styles.symptomHistoryHeader}>
              <Text style={styles.symptomHistoryDate}>Hier, 10:15</Text>
              <View style={[styles.symptomSeverity, { backgroundColor: '#5CB85C' }]}>
                <Text style={styles.symptomSeverityText}>Léger</Text>
              </View>
            </View>
            <View style={styles.symptomList}>
              <Text style={styles.symptomItem}>💨 Respiration sifflante (légère)</Text>
            </View>
            <Text style={styles.symptomEnv}>AQI : 45 • Pollen : Faible</Text>
          </View>

          {/* Qualité de l'air */}
          <Text style={styles.sectionTitle}>Environnement</Text>
          <View style={styles.dataCard}>
            <Text style={styles.dataTitle}>Qualité de l'Air Actuelle</Text>
            <Text style={styles.dataValue}>45 AQI</Text>
            <Text style={styles.dataStatus}>🟢 Bon</Text>
          </View>

          {/* Bouton pour connecter capteurs */}
          <TouchableOpacity style={styles.upgradeCard}>
            <Text style={styles.upgradeIcon}>🚀</Text>
            <View style={styles.upgradeContent}>
              <Text style={styles.upgradeTitle}>Passez au niveau supérieur</Text>
              <Text style={styles.upgradeText}>
                Connectez des capteurs pour un suivi biométrique automatique et des prédictions personnalisées
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Si capteurs connectés, afficher interface complète
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Données Biométriques</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'realtime' && styles.activeTab]}
          onPress={() => setActiveTab('realtime')}
        >
          <Text style={[styles.tabText, activeTab === 'realtime' && styles.activeTabText]}>
            Temps Réel
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Historique
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'realtime' ? (
          <View>
            <Text style={styles.sectionTitle}>Dernière mise à jour : Il y a 2 min</Text>
            
            {/* Données Biométriques */}
            <Text style={styles.categoryTitle}>🫀 Biométrique</Text>
            
            <View style={styles.dataCard}>
              <View style={styles.dataHeader}>
                <Text style={styles.dataIcon}>🫁</Text>
                <Text style={styles.dataTitle}>Saturation en Oxygène (SpO2)</Text>
              </View>
              <View style={styles.gauge}>
                <Text style={styles.gaugeValue}>98</Text>
                <Text style={styles.gaugeUnit}>%</Text>
              </View>
              <Text style={styles.statusNormal}>✅ Normal (95-100%)</Text>
              <Text style={styles.trend}>→ Tendance : Stable</Text>
            </View>

            <View style={styles.dataCard}>
              <View style={styles.dataHeader}>
                <Text style={styles.dataIcon}>💨</Text>
                <Text style={styles.dataTitle}>Fréquence Respiratoire</Text>
              </View>
              <View style={styles.gauge}>
                <Text style={styles.gaugeValue}>16</Text>
                <Text style={styles.gaugeUnit}>/min</Text>
              </View>
              <Text style={styles.statusNormal}>✅ Normal (12-20/min)</Text>
              <Text style={styles.trend}>→ Tendance : Stable</Text>
            </View>

            <View style={styles.dataCard}>
              <View style={styles.dataHeader}>
                <Text style={styles.dataIcon}>❤️</Text>
                <Text style={styles.dataTitle}>Fréquence Cardiaque</Text>
              </View>
              <View style={styles.gauge}>
                <Text style={styles.gaugeValue}>72</Text>
                <Text style={styles.gaugeUnit}>bpm</Text>
              </View>
              <Text style={styles.statusNormal}>✅ Normal (60-100 bpm)</Text>
              <Text style={styles.trend}>→ Tendance : Stable</Text>
            </View>

            {/* Environnement Local */}
            <Text style={styles.categoryTitle}>🏠 Environnement Local</Text>

            <View style={styles.dataCard}>
              <View style={styles.dataHeader}>
                <Text style={styles.dataIcon}>💨</Text>
                <Text style={styles.dataTitle}>Qualité de l'Air (CO2)</Text>
              </View>
              <View style={styles.gauge}>
                <Text style={styles.gaugeValue}>420</Text>
                <Text style={styles.gaugeUnit}>ppm</Text>
              </View>
              <Text style={styles.statusNormal}>✅ Normal ( 1000 ppm)</Text>
            </View>

            <View style={styles.dataCard}>
              <View style={styles.dataHeader}>
                <Text style={styles.dataIcon}>🌡️</Text>
                <Text style={styles.dataTitle}>Température & Humidité</Text>
              </View>
              <View style={styles.envDataRow}>
                <View style={styles.envDataItem}>
                  <Text style={styles.envDataValue}>22°C</Text>
                  <Text style={styles.envDataLabel}>Température</Text>
                </View>
                <View style={styles.envDataItem}>
                  <Text style={styles.envDataValue}>65%</Text>
                  <Text style={styles.envDataLabel}>Humidité</Text>
                </View>
              </View>
            </View>

            {/* Corrélations */}
            <TouchableOpacity style={styles.correlationCard}>
              <Text style={styles.correlationIcon}>🔗</Text>
              <View style={styles.correlationContent}>
                <Text style={styles.correlationTitle}>Voir les corrélations</Text>
                <Text style={styles.correlationSubtitle}>Liens entre santé et environnement</Text>
              </View>
              <Text style={styles.correlationArrow}>›</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Période : 7 derniers jours</Text>
            
            <View style={styles.historyCard}>
              <Text style={styles.historyTitle}>📊 SpO2 (Saturation en Oxygène)</Text>
              <Text style={styles.historyPlaceholder}>
                [Graphique SpO2 sur 7 jours]
              </Text>
              <Text style={styles.historyStats}>
                Moyenne : 97% | Min : 94% | Max : 99%
              </Text>
            </View>

            <View style={styles.historyCard}>
              <Text style={styles.historyTitle}>📊 Fréquence Respiratoire</Text>
              <Text style={styles.historyPlaceholder}>
                [Graphique FR sur 7 jours]
              </Text>
              <Text style={styles.historyStats}>
                Moyenne : 16/min | Min : 14 | Max : 19
              </Text>
            </View>

            <View style={styles.historyCard}>
              <Text style={styles.historyTitle}>📊 Environnement Local</Text>
              <Text style={styles.historyPlaceholder}>
                [Graphique CO2 et Température]
              </Text>
              <Text style={styles.historyStats}>
                CO2 moyen : 450 ppm | Temp. moy. : 21°C
              </Text>
            </View>

            <TouchableOpacity style={styles.exportButton}>
              <Text style={styles.exportButtonText}>📥 Exporter les données (CSV)</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#4A90E2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  
  // Styles pour mode SANS capteurs
  infoCard: {
    backgroundColor: '#E8F4FD',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  infoIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
    marginTop: 10,
  },
  symptomButton: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  symptomButtonIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  symptomButtonContent: {
    flex: 1,
  },
  symptomButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  symptomButtonSubtitle: {
    fontSize: 14,
    color: '#E8F4FD',
    marginTop: 2,
  },
  symptomButtonArrow: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  symptomHistoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  symptomHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  symptomHistoryDate: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  symptomSeverity: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  symptomSeverityText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  symptomList: {
    marginBottom: 10,
  },
  symptomItem: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 5,
  },
  symptomNote: {
    fontSize: 13,
    color: '#7F8C8D',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  symptomEnv: {
    fontSize: 12,
    color: '#4A90E2',
  },
  upgradeCard: {
    backgroundColor: '#E8F4FD',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
  },
  upgradeIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  upgradeText: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  
  // Styles pour mode AVEC capteurs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 15,
  },
  dataCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dataIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  gauge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 10,
  },
  gaugeValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  gaugeUnit: {
    fontSize: 20,
    color: '#7F8C8D',
    marginLeft: 5,
  },
  statusNormal: {
    textAlign: 'center',
    fontSize: 14,
    color: '#5CB85C',
    marginBottom: 5,
  },
  trend: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7F8C8D',
  },
  envDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  envDataItem: {
    alignItems: 'center',
  },
  envDataValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  envDataLabel: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  correlationCard: {
    backgroundColor: '#FFF4E5',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0AD4E',
  },
  correlationIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  correlationContent: {
    flex: 1,
  },
  correlationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  correlationSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  correlationArrow: {
    fontSize: 24,
    color: '#F0AD4E',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  historyPlaceholder: {
    height: 150,
    backgroundColor: '#E8F4FD',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 60,
    color: '#7F8C8D',
  },
  historyStats: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 10,
  },
  exportButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dataValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginVertical: 10,
  },
  dataStatus: {
    fontSize: 16,
    textAlign: 'center',
    color: '#5CB85C',
  },
});