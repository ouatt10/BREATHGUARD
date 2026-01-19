import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl, Platform, Alert as RNAlert } from 'react-native';
import { alertAPI } from '../../src/services/api';

export default function AlertScreen() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'critical'

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const response = await alertAPI.getAlerts();
      
      if (response.success && response.data?.alertes) {
        setAlerts(response.data.alertes);
      }
    } catch (error) {
      console.error('Erreur chargement alertes:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAlerts();
  };

  const handleMarkAsRead = async (alertId: string) => {
    try {
      await alertAPI.markAsRead(alertId);
      
      // Mettre à jour localement
      setAlerts(alerts.map(alert => 
        alert._id === alertId ? { ...alert, lu: true } : alert
      ));
    } catch (error) {
      console.error('Erreur marquage alerte:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const confirmed = Platform.OS === 'web'
      ? window.confirm('Marquer toutes les alertes comme lues ?')
      : await new Promise((resolve) => {
          RNAlert.alert(
            'Confirmation',
            'Marquer toutes les alertes comme lues ?',
            [
              { text: 'Annuler', style: 'cancel', onPress: () => resolve(false) },
              { text: 'Confirmer', onPress: () => resolve(true) },
            ]
          );
        });

    if (!confirmed) return;

    try {
      await alertAPI.markAllAsRead();
      
      // Mettre à jour localement
      setAlerts(alerts.map(alert => ({ ...alert, lu: true })));
      
      if (Platform.OS === 'web') {
        alert('Toutes les alertes ont été marquées comme lues');
      }
    } catch (error) {
      console.error('Erreur marquage toutes alertes:', error);
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    const confirmed = Platform.OS === 'web'
      ? window.confirm('Supprimer cette alerte ?')
      : await new Promise((resolve) => {
          RNAlert.alert(
            'Confirmation',
            'Supprimer cette alerte ?',
            [
              { text: 'Annuler', style: 'cancel', onPress: () => resolve(false) },
              { text: 'Supprimer', style: 'destructive', onPress: () => resolve(true) },
            ]
          );
        });

    if (!confirmed) return;

    try {
      await alertAPI.deleteAlert(alertId);
      
      // Retirer localement
      setAlerts(alerts.filter(alert => alert._id !== alertId));
    } catch (error) {
      console.error('Erreur suppression alerte:', error);
    }
  };

  const getFilteredAlerts = () => {
    switch (filter) {
      case 'unread':
        return alerts.filter(alert => !alert.lu);
      case 'critical':
        return alerts.filter(alert => alert.niveau === 'critique');
      default:
        return alerts;
    }
  };

  const getAlertStyle = (niveau: string) => {
    switch (niveau) {
      case 'critique':
        return { backgroundColor: '#FFE5E5', borderColor: '#E74C3C' };
      case 'warning':
        return { backgroundColor: '#FFF4E5', borderColor: '#F39C12' };
      case 'info':
        return { backgroundColor: '#E8F4FD', borderColor: '#4A90E2' };
      default:
        return { backgroundColor: '#E8F8E8', borderColor: '#27AE60' };
    }
  };

  const getAlertIcon = (niveau: string) => {
    switch (niveau) {
      case 'critique':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '✅';
    }
  };

  const unreadCount = alerts.filter(alert => !alert.lu).length;
  const filteredAlerts = getFilteredAlerts();

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Chargement des alertes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header avec badge */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alertes</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      {/* Actions */}
      {alerts.length > 0 && unreadCount > 0 && (
        <View style={styles.actionsBar}>
          <TouchableOpacity style={styles.markAllButton} onPress={handleMarkAllAsRead}>
            <Text style={styles.markAllButtonText}>✓ Tout marquer comme lu</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Filtres */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            Toutes ({alerts.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === 'unread' && styles.activeFilter]}
          onPress={() => setFilter('unread')}
        >
          <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
            Non lues ({unreadCount})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === 'critical' && styles.activeFilter]}
          onPress={() => setFilter('critical')}
        >
          <Text style={[styles.filterText, filter === 'critical' && styles.filterTextActive]}>
            Critiques
          </Text>
        </TouchableOpacity>
      </View>

      {/* Liste des alertes */}
      <ScrollView
        style={styles.alertList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4A90E2']} />
        }
      >
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <View
              key={alert._id}
              style={[
                styles.alertCard,
                getAlertStyle(alert.niveau),
                !alert.lu && styles.unreadAlert,
              ]}
            >
              <View style={styles.alertHeader}>
                <Text style={styles.alertIcon}>{getAlertIcon(alert.niveau)}</Text>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.type}</Text>
                  <Text style={styles.alertTime}>
                    {new Date(alert.date).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                {!alert.lu && <View style={styles.unreadDot} />}
              </View>
              
              <Text style={styles.alertMessage}>{alert.message}</Text>
              
              <View style={styles.alertActions}>
                {!alert.lu && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleMarkAsRead(alert._id)}
                  >
                    <Text style={styles.actionButtonText}>✓ Marquer comme lu</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteAlert(alert._id)}
                >
                  <Text style={[styles.actionButtonText, { color: '#E74C3C' }]}>
                    🗑️ Supprimer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>
              {filter === 'all' ? '✨' : filter === 'unread' ? '✅' : '🎉'}
            </Text>
            <Text style={styles.emptyText}>
              {filter === 'all'
                ? 'Aucune alerte pour le moment'
                : filter === 'unread'
                ? 'Toutes les alertes sont lues !'
                : 'Aucune alerte critique'}
            </Text>
            <Text style={styles.emptySubtext}>
              {filter === 'all'
                ? 'Profitez de votre journée !'
                : 'Continuez comme ça !'}
            </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#E74C3C',
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionsBar: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  markAllButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  markAllButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
    color: '#FFFFFF',
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
    backgroundColor: '#E74C3C',
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
    gap: 10,
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