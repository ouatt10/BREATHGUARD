import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DataScreen() {
  const [activeTab, setActiveTab] = useState('realtime');

  return (
    <View style={styles.container}>
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
            
            {/* SpO2 */}
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
              <Text style={styles.trend}>↗️ Tendance : Stable</Text>
            </View>

            {/* Fréquence Respiratoire */}
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

            {/* Fréquence Cardiaque */}
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

            {/* Température */}
            <View style={styles.dataCard}>
              <View style={styles.dataHeader}>
                <Text style={styles.dataIcon}>🌡️</Text>
                <Text style={styles.dataTitle}>Température Corporelle</Text>
              </View>
              <View style={styles.gauge}>
                <Text style={styles.gaugeValue}>36.8</Text>
                <Text style={styles.gaugeUnit}>°C</Text>
              </View>
              <Text style={styles.statusNormal}>✅ Normal (36-37.5°C)</Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Période : 7 derniers jours</Text>
            
            <View style={styles.historyCard}>
              <Text style={styles.historyTitle}>📊 Graphiques d'évolution</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#7F8C8D',
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
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});