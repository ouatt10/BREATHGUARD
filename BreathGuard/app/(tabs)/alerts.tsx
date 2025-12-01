import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AlertScreen() {
  const alerts = [
    {
      id: 1,
      type: 'info',
      title: 'Recommandation Quotidienne',
      message: 'Qualité d\'air excellente aujourd\'hui ! Profitez-en pour faire de l\'exercice.',
      time: 'Il y a 5 min',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Attention : Humidité élevée',
      message: 'L\'humidité atteint 75%. Risque d\'irritation respiratoire. Hydratez-vous.',
      time: 'Il y a 2h',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      title: 'SpO2 Normal',
      message: 'Votre saturation en oxygène est stable à 98%. Excellente forme !',
      time: 'Il y a 5h',
      read: true,
    },
  ];

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return { backgroundColor: '#FFE5E5', borderColor: '#D9534F' };
      case 'warning':
        return { backgroundColor: '#FFF4E5', borderColor: '#F0AD4E' };
      case 'success':
        return { backgroundColor: '#E8F8E8', borderColor: '#5CB85C' };
      default:
        return { backgroundColor: '#E8F4FD', borderColor: '#4A90E2' };
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      default:
        return 'ℹ️';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header avec badge */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alertes</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>2</Text>
        </View>
      </View>

      {/* Filtres */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.filterTextActive}>Toutes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Critiques</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Non lues</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des alertes */}
      <ScrollView style={styles.alertList}>
        {alerts.map((alert) => (
          <TouchableOpacity
            key={alert.id}
            style={[
              styles.alertCard,
              getAlertStyle(alert.type),
              !alert.read && styles.unreadAlert,
            ]}
          >
            <View style={styles.alertHeader}>
              <Text style={styles.alertIcon}>{getAlertIcon(alert.type)}</Text>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
              {!alert.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.alertMessage}>{alert.message}</Text>
            <View style={styles.alertActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Voir détails</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {alerts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✨</Text>
            <Text style={styles.emptyText}>Aucune alerte pour le moment</Text>
            <Text style={styles.emptySubtext}>Profitez de votre journée !</Text>
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
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  badge: {
    backgroundColor: '#D9534F',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F5F7FA',
  },
  activeFilter: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  filterTextActive: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  alertList: {
    flex: 1,
    padding: 20,
  },
  alertCard: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadAlert: {
    borderWidth: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  alertTime: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D9534F',
  },
  alertMessage: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 10,
  },
  alertActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7F8C8D',
  },
});