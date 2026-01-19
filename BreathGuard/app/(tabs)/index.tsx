import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { alertAPI, dataAPI } from '../../src/services/api';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [latestData, setLatestData] = useState<any>(null);
  const [statistics, setStatistics] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);

  // ✅ CORRECTION : useEffect avec dépendance vide pour éviter la boucle
  useEffect(() => {
    loadDashboardData();
  }, []); // Dépendance vide = se déclenche UNE SEULE FOIS

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log('🔍 [DASHBOARD] Chargement des données...');

      // ✅ CORRECTION : Passer un NOMBRE, pas un objet
      const historyResponse = await dataAPI.getHistory(10); // ✅ NOMBRE, pas objet
      console.log('📊 [DASHBOARD] Réponse historique:', JSON.stringify(historyResponse, null, 2));

      // Extraction robuste des données
      let donnees = null;
      if (historyResponse?.success && historyResponse?.data?.donnees) {
        donnees = historyResponse.data.donnees;
      } else if (historyResponse?.data && Array.isArray(historyResponse.data)) {
        donnees = historyResponse.data;
      } else if (Array.isArray(historyResponse)) {
        donnees = historyResponse;
      }

      if (donnees && Array.isArray(donnees) && donnees.length > 0) {
        setLatestData(donnees[0]);
        console.log('✅ [DASHBOARD] Dernières données:', donnees[0]);
      } else {
        console.log('⚠️ [DASHBOARD] Aucune donnée disponible');
      }

      // Statistiques - calcul local basé sur les données disponibles
      if (donnees && Array.isArray(donnees)) {
        setStatistics({
          totalMesures: donnees.length,
          nombreMesures: donnees.length,
        });
        console.log('✅ [DASHBOARD] Statistiques calculées');
      }

      // Charger les alertes récentes (optionnel)
      try {
        const alertsResponse = await alertAPI.getUnreadAlerts?.();
        if (alertsResponse?.success && alertsResponse?.data?.alertes) {
          setAlerts(alertsResponse.data.alertes.slice(0, 3));
          console.log('✅ [DASHBOARD] Alertes chargées:', alertsResponse.data.alertes.length);
        }
      } catch (error) {
        console.log('⚠️ [DASHBOARD] Alertes non disponibles');
      }
    } catch (error: any) {
      console.error('❌ [DASHBOARD] Erreur chargement:', error.message);
      if (error.response?.status !== 401) {
        console.error('❌ [DASHBOARD] Stack:', error.stack);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const getMetricValue = (data: any, metricType: string): string => {
    if (!data) return '--';

    const possibleKeys = {
      SpO2: ['SpO2', 'spo2', 'saturation', 'valeur'],
      FC: ['FC', 'fc', 'bpm', 'frequenceCardiaque', 'valeur'],
      FR: ['FR', 'fr', 'frequenceRespiratoire', 'respiratoire', 'valeur'],
    };

    const keys = possibleKeys[metricType as keyof typeof possibleKeys] || [];

    if (data.type === metricType && data.valeur !== undefined) {
      return String(data.valeur);
    }

    for (const key of keys) {
      if (data[key] !== undefined && data[key] !== null) {
        return String(data[key]);
      }
    }

    return '--';
  };

  const getHealthStatus = () => {
    if (!latestData) return { status: 'Aucune donnée', color: '#95A5A6', icon: '📊' };

    const spo2Value = getMetricValue(latestData, 'SpO2');
    const spo2 = spo2Value !== '--' ? parseFloat(spo2Value) : null;
    
    if (spo2 && spo2 >= 95) {
      return { status: 'Excellent', color: '#27AE60', icon: '✅' };
    } else if (spo2 && spo2 >= 90) {
      return { status: 'Bon', color: '#F39C12', icon: '⚠️' };
    } else if (spo2) {
      return { status: 'Attention', color: '#E74C3C', icon: '🚨' };
    }

    return { status: 'Normal', color: '#3498DB', icon: '📊' };
  };

  const healthStatus = getHealthStatus();

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Chargement des données...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4A90E2']} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour,</Text>
        <Text style={styles.userName}>{user?.prenom} {user?.nom} 👋</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</Text>
      </View>

      <View style={[styles.healthCard, { borderLeftColor: healthStatus.color }]}>
        <View style={styles.healthHeader}>
          <Text style={styles.healthIcon}>{healthStatus.icon}</Text>
          <View style={styles.healthInfo}>
            <Text style={styles.healthTitle}>État de santé</Text>
            <Text style={[styles.healthStatus, { color: healthStatus.color }]}>
              {healthStatus.status}
            </Text>
          </View>
        </View>
        <Text style={styles.healthSubtext}>
          Basé sur vos dernières mesures
        </Text>
      </View>

      <Text style={styles.sectionTitle}>📊 Données actuelles</Text>
      
      {latestData ? (
        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, { backgroundColor: '#E8F4FD' }]}>
            <Text style={styles.metricIcon}>💙</Text>
            <Text style={styles.metricLabel}>SpO2</Text>
            <Text style={styles.metricValue}>
              {getMetricValue(latestData, 'SpO2')}
            </Text>
            <Text style={styles.metricUnit}>%</Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: '#FDECEA' }]}>
            <Text style={styles.metricIcon}>❤️</Text>
            <Text style={styles.metricLabel}>Fréquence Cardiaque</Text>
            <Text style={styles.metricValue}>
              {getMetricValue(latestData, 'FC')}
            </Text>
            <Text style={styles.metricUnit}>bpm</Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: '#E8F8F5' }]}>
            <Text style={styles.metricIcon}>🫁</Text>
            <Text style={styles.metricLabel}>Fréquence Respiratoire</Text>
            <Text style={styles.metricValue}>
              {getMetricValue(latestData, 'FR')}
            </Text>
            <Text style={styles.metricUnit}>rpm</Text>
          </View>
        </View>
      ) : (
        <View style={styles.noDataCard}>
          <Text style={styles.noDataIcon}>📊</Text>
          <Text style={styles.noDataText}>Aucune donnée disponible</Text>
          <Text style={styles.noDataSubtext}>
            Envoyez vos premières mesures ou connectez vos capteurs
          </Text>
        </View>
      )}

      {statistics && (
        <>
          <Text style={styles.sectionTitle}>📈 Statistiques du jour</Text>
          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Nombre de mesures</Text>
              <Text style={styles.statValue}>{statistics.totalMesures || statistics.nombreMesures || 0}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Dernière mise à jour</Text>
              <Text style={styles.statValue}>
                {latestData 
                  ? new Date(latestData.createdAt || latestData.date || Date.now()).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                  : '--:--'
                }
              </Text>
            </View>
          </View>
        </>
      )}

      {alerts.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>🔔 Alertes récentes</Text>
          {alerts.map((alert, index) => (
            <View key={alert._id || index} style={[
              styles.alertCard,
              { borderLeftColor: alert.niveau === 'critique' ? '#E74C3C' : '#F39C12' }
            ]}>
              <View style={styles.alertHeader}>
                <Text style={styles.alertTitle}>{alert.type}</Text>
                <Text style={[
                  styles.alertBadge,
                  { 
                    backgroundColor: alert.niveau === 'critique' ? '#E74C3C' : '#F39C12',
                  }
                ]}>
                  {alert.niveau}
                </Text>
              </View>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <Text style={styles.alertTime}>
                {new Date(alert.date || alert.createdAt).toLocaleString('fr-FR')}
              </Text>
            </View>
          ))}
        </>
      )}

      <Text style={styles.sectionTitle}>⚡ Actions rapides</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionText}>Nouvelle mesure</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📈</Text>
          <Text style={styles.actionText}>Voir l'historique</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>🔔</Text>
          <Text style={styles.actionText}>Gérer les alertes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>⚙️</Text>
          <Text style={styles.actionText}>Paramètres</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tirez vers le bas pour actualiser
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#4A90E2', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  greeting: { fontSize: 16, color: '#E8F4FD' },
  userName: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 5 },
  date: { fontSize: 14, color: '#E8F4FD', marginTop: 5 },
  healthCard: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 15, borderLeftWidth: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  healthHeader: { flexDirection: 'row', alignItems: 'center' },
  healthIcon: { fontSize: 40, marginRight: 15 },
  healthInfo: { flex: 1 },
  healthTitle: { fontSize: 16, color: '#666' },
  healthStatus: { fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  healthSubtext: { fontSize: 12, color: '#999', marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginHorizontal: 20, marginTop: 20, marginBottom: 10 },
  metricsGrid: { paddingHorizontal: 20 },
  metricCard: { padding: 20, borderRadius: 15, marginBottom: 15, alignItems: 'center' },
  metricIcon: { fontSize: 32, marginBottom: 10 },
  metricLabel: { fontSize: 14, color: '#666', marginBottom: 5 },
  metricValue: { fontSize: 36, fontWeight: 'bold', color: '#2C3E50' },
  metricUnit: { fontSize: 16, color: '#999', marginTop: 5 },
  noDataCard: { backgroundColor: '#fff', marginHorizontal: 20, padding: 40, borderRadius: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  noDataIcon: { fontSize: 48, marginBottom: 15 },
  noDataText: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 10 },
  noDataSubtext: { fontSize: 14, color: '#999', textAlign: 'center' },
  statsCard: { backgroundColor: '#fff', marginHorizontal: 20, padding: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  statLabel: { fontSize: 16, color: '#666' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  alertCard: { backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 10, padding: 15, borderRadius: 10, borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  alertTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  alertBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 12, color: '#fff', fontWeight: '600', overflow: 'hidden' },
  alertMessage: { fontSize: 14, color: '#666', marginBottom: 8 },
  alertTime: { fontSize: 12, color: '#999' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, marginBottom: 20 },
  actionButton: { width: '48%', backgroundColor: '#fff', margin: '1%', padding: 20, borderRadius: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  actionIcon: { fontSize: 32, marginBottom: 10 },
  actionText: { fontSize: 14, fontWeight: '600', color: '#2C3E50', textAlign: 'center' },
  footer: { alignItems: 'center', paddingVertical: 20 },
  footerText: { fontSize: 12, color: '#999' },
});