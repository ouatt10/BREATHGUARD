import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* Placeholder pour la carte */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>🗺️</Text>
        <Text style={styles.mapLabel}>Carte Interactive</Text>
        <Text style={styles.mapSubLabel}>(Google Maps sera intégrée ici)</Text>
      </View>

      <ScrollView style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📍 Votre Position</Text>
          <Text style={styles.infoValue}>Abidjan, Côte d'Ivoire</Text>
        </View>

        <View style={styles.aqiCard}>
          <Text style={styles.aqiTitle}>Qualité de l'Air (AQI)</Text>
          <View style={styles.aqiGauge}>
            <Text style={styles.aqiValue}>45</Text>
          </View>
          <Text style={styles.aqiStatus}>🟢 Air Sain</Text>
          <Text style={styles.aqiDescription}>
            Qualité de l'air satisfaisante, aucun risque pour la santé.
          </Text>
        </View>

        <View style={styles.envCard}>
          <Text style={styles.envTitle}>🌡️ Conditions Environnementales</Text>
          <View style={styles.envRow}>
            <Text style={styles.envLabel}>Température :</Text>
            <Text style={styles.envValue}>28°C</Text>
          </View>
          <View style={styles.envRow}>
            <Text style={styles.envLabel}>Humidité :</Text>
            <Text style={styles.envValue}>65%</Text>
          </View>
          <View style={styles.envRow}>
            <Text style={styles.envLabel}>CO2 :</Text>
            <Text style={styles.envValue}>420 ppm</Text>
          </View>
        </View>

        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>📊 Légende AQI</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#5CB85C' }]} />
            <Text style={styles.legendText}>0-50 : Bon</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#F0AD4E' }]} />
            <Text style={styles.legendText}>51-100 : Modéré</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FF8C00' }]} />
            <Text style={styles.legendText}>101-150 : Mauvais</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#D9534F' }]} />
            <Text style={styles.legendText}>151-200 : Très mauvais</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.routeButton}>
          <Text style={styles.routeButtonText}>🧭 Planifier un itinéraire</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  mapPlaceholder: {
    height: 250,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  mapText: {
    fontSize: 64,
  },
  mapLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginTop: 10,
  },
  mapSubLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 5,
  },
  infoContainer: {
    flex: 1,
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#4A90E2',
  },
  aqiCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aqiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  aqiGauge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#5CB85C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  aqiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  aqiStatus: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5CB85C',
    marginBottom: 10,
  },
  aqiDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  envCard: {
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
  envTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
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
  legendCard: {
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
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 30,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  routeButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  routeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});