import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bonjour ! 👋</Text>
        <Text style={styles.subtitle}>Bienvenue sur BreathGuard</Text>
      </View>

      {/* Score de Risque */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Score de Risque du Jour</Text>
        <View style={styles.riskScore}>
          <Text style={styles.scoreNumber}>25</Text>
          <Text style={styles.scoreLabel}>/ 100</Text>
        </View>
        <Text style={styles.riskMessage}>Risque Faible ✅</Text>
      </View>

      {/* Données Biométriques */}
      <Text style={styles.sectionTitle}>Vos Données</Text>
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricIcon}>🫁</Text>
          <Text style={styles.metricValue}>98%</Text>
          <Text style={styles.metricLabel}>SpO2</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricIcon}>💨</Text>
          <Text style={styles.metricValue}>16</Text>
          <Text style={styles.metricLabel}>Freq. Resp.</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricIcon}>❤️</Text>
          <Text style={styles.metricValue}>72</Text>
          <Text style={styles.metricLabel}>Freq. Card.</Text>
        </View>
      </View>

      {/* Qualité de l'Air */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Qualité de l'Air</Text>
        <Text style={styles.airQuality}>Air Sain 🌿</Text>
        <Text style={styles.airValue}>AQI : 45</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  riskScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#5CB85C',
  },
  scoreLabel: {
    fontSize: 24,
    color: '#7F8C8D',
    marginLeft: 5,
  },
  riskMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#5CB85C',
    marginTop: 10,
    fontWeight: '600',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    width: '30%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  metricLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 5,
    textAlign: 'center',
  },
  airQuality: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5CB85C',
    textAlign: 'center',
    marginBottom: 5,
  },
  airValue: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});