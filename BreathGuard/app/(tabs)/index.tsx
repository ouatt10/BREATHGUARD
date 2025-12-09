import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUser } from '../../src/context/UserContext';

export default function HomeScreen() {
  const { hasSensors, isPatient } = useUser();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bonjour ! 👋</Text>
        <Text style={styles.subtitle}>Bienvenue sur BreathGuard</Text>
        {isPatient && (
          <View style={styles.patientBadge}>
            <Text style={styles.patientBadgeText}>👨‍⚕️ Patient</Text>
          </View>
        )}
      </View>

      {/* Score de Risque */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Score de Risque du Jour</Text>
        <View style={styles.riskScore}>
          <Text style={styles.scoreNumber}>25</Text>
          <Text style={styles.scoreLabel}>/ 100</Text>
        </View>
        <Text style={styles.riskMessage}>Risque Faible ✅</Text>
        <Text style={styles.riskBasis}>
          {hasSensors 
            ? 'Basé sur vos données biométriques et environnement' 
            : 'Basé sur les données environnementales'}
        </Text>
      </View>

      {/* Données Biométriques - Uniquement si capteurs */}
      {hasSensors ? (
        <>
          <Text style={styles.sectionTitle}>Vos Données Biométriques</Text>
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

          <Text style={styles.sectionTitle}>Environnement Local</Text>
          <View style={styles.card}>
            <View style={styles.envRow}>
              <Text style={styles.envLabel}>CO2 :</Text>
              <Text style={styles.envValue}>420 ppm ✅</Text>
            </View>
            <View style={styles.envRow}>
              <Text style={styles.envLabel}>Température :</Text>
              <Text style={styles.envValue}>22°C</Text>
            </View>
            <View style={styles.envRow}>
              <Text style={styles.envLabel}>Humidité :</Text>
              <Text style={styles.envValue}>65%</Text>
            </View>
          </View>
        </>
      ) : (
        <>
          {/* Message pour utilisateurs sans capteurs */}
          <View style={styles.noSensorsCard}>
            <Text style={styles.noSensorsIcon}>📱</Text>
            <Text style={styles.noSensorsTitle}>Vous n'avez pas de capteurs connectés</Text>
            <Text style={styles.noSensorsText}>
              Connectez des capteurs BreathGuard pour bénéficier du suivi biométrique complet et de prédictions personnalisées.
            </Text>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connecter des capteurs</Text>
            </TouchableOpacity>
          </View>

          {/* Section pour déclarer symptômes */}
          <TouchableOpacity style={styles.symptomCard}>
            <Text style={styles.symptomIcon}>📝</Text>
            <View style={styles.symptomContent}>
              <Text style={styles.symptomTitle}>Comment vous sentez-vous ?</Text>
              <Text style={styles.symptomSubtitle}>Déclarez vos symptômes</Text>
            </View>
            <Text style={styles.symptomArrow}>›</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Qualité de l'Air - Pour TOUS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Qualité de l'Air Régionale</Text>
        <Text style={styles.airQuality}>Air Sain 🌿</Text>
        <Text style={styles.airValue}>AQI : 45</Text>
      </View>

      {/* Recommandation IA */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 Recommandation du Jour</Text>
        <Text style={styles.recommendation}>
          {hasSensors 
            ? 'Vos paramètres sont excellents ! Profitez de la bonne qualité de l\'air pour faire de l\'exercice ce matin.' 
            : 'La qualité de l\'air est bonne aujourd\'hui. C\'est un bon moment pour sortir et faire de l\'exercice.'}
        </Text>
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
    paddingTop: 40,
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
  patientBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#5CB85C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  patientBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
  riskBasis: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 8,
    fontStyle: 'italic',
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
  envRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  envLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  envValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  noSensorsCard: {
    backgroundColor: '#FFF4E5',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0AD4E',
    borderStyle: 'dashed',
  },
  noSensorsIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  noSensorsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  noSensorsText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  connectButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  symptomCard: {
    backgroundColor: '#E8F4FD',
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  symptomIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  symptomContent: {
    flex: 1,
  },
  symptomTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  symptomSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  symptomArrow: {
    fontSize: 24,
    color: '#4A90E2',
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
  recommendation: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
});