import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { dataAPI } from '../../src/services/api';

export default function DataScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'graphs'>('overview');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [latestData, setLatestData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  // Pour la saisie manuelle
  const [manualMode, setManualMode] = useState(false);
  const [manualValues, setManualValues] = useState({
    SpO2: '',
    FC: '',
    FR: '',
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🔍 [DONNÉES] Chargement...');

      // Historique
      const historyResponse = await dataAPI.getHistory(50);
      console.log('📊 [DONNÉES] Réponse brute:', JSON.stringify(historyResponse, null, 2));

      // ✅ CORRECTION : Extraction robuste
      let donnees = null;
      if (historyResponse?.success && historyResponse?.data?.donnees) {
        donnees = historyResponse.data.donnees;
      } else if (historyResponse?.data && Array.isArray(historyResponse.data)) {
        donnees = historyResponse.data;
      } else if (Array.isArray(historyResponse)) {
        donnees = historyResponse;
      }

      if (donnees && Array.isArray(donnees)) {
        setHistory(donnees);
        if (donnees.length > 0) setLatestData(donnees[0]);
        console.log(`✅ [DONNÉES] ${donnees.length} entrée(s) chargée(s)`);
      } else {
        console.log('⚠️ [DONNÉES] Format inattendu:', historyResponse);
      }

      // Statistiques
      const statsResponse = await dataAPI.getStatistics();
      if (statsResponse?.success && statsResponse?.data) {
        setStats(statsResponse.data);
        console.log('✅ [DONNÉES] Statistiques chargées');
      }
    } catch (error: any) {
      console.error('❌ [DONNÉES] Erreur:', error.message);
      if (Platform.OS === 'web') {
        console.error('❌ [DONNÉES] Stack:', error.stack);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  // ✅ 🆕 FONCTION CORRIGÉE : Envoi au nouveau format
  const handleSendManualData = async () => {
    try {
      setSending(true);
      console.log('📤 [DONNÉES] Envoi données manuelles...');

      // Validation : au moins un champ rempli
      if (!manualValues.SpO2 && !manualValues.FC && !manualValues.FR) {
        if (Platform.OS === 'web') {
          alert('⚠️ Veuillez remplir au moins un champ');
        } else {
          Alert.alert('Attention', 'Veuillez remplir au moins un champ');
        }
        return;
      }

      // ✅ NOUVEAU FORMAT : Toutes les valeurs en une seule requête
      const dataToSend: any = {
        source: 'manuel',
      };

      // Ajouter seulement les valeurs non-vides
      if (manualValues.SpO2 && manualValues.SpO2.trim() !== '') {
        const val = parseFloat(manualValues.SpO2);
        if (!isNaN(val)) {
          dataToSend.spo2 = val;
        }
      }

      if (manualValues.FC && manualValues.FC.trim() !== '') {
        const val = parseFloat(manualValues.FC);
        if (!isNaN(val)) {
          dataToSend.frequenceCardiaque = val;
        }
      }

      if (manualValues.FR && manualValues.FR.trim() !== '') {
        const val = parseFloat(manualValues.FR);
        if (!isNaN(val)) {
          dataToSend.frequenceRespiratoire = val;
        }
      }

      console.log('📤 [DONNÉES] Valeurs du formulaire:', manualValues);
      console.log('📤 [DONNÉES] Données à envoyer:', dataToSend);

      // ✅ UN SEUL APPEL API avec toutes les données
      const response = await dataAPI.sendManualData(dataToSend);

      console.log('✅ [API] Données envoyées:', response);

      // Réinitialiser le formulaire
      setManualMode(false);
      setManualValues({ SpO2: '', FC: '', FR: '' });

      // Recharger les données
      await loadData();

      // Message de succès
      if (Platform.OS === 'web') {
        alert('✅ Données envoyées avec succès !');
      } else {
        Alert.alert('Succès', 'Données envoyées avec succès !');
      }
    } catch (error: any) {
      console.error('❌ [DONNÉES] Erreur envoi:', error.message);
      
      if (Platform.OS === 'web') {
        alert('❌ Erreur : ' + error.message);
      } else {
        Alert.alert('Erreur', 'Impossible d\'envoyer les données');
      }
    } finally {
      setSending(false);
    }
  };

  // ✅ CORRECTION : Fonction robuste pour extraire les valeurs
  const getMetricValue = (data: any, metricType: string): string => {
    if (!data) return '--';

    // Si data.type correspond au metricType
    if (data.type === metricType && data.valeur !== undefined) {
      return String(data.valeur);
    }

    // Chercher dans les clés possibles
    const possibleKeys: { [key: string]: string[] } = {
      SpO2: ['SpO2', 'spo2', 'saturation', 'valeur'],
      FC: ['FC', 'fc', 'bpm', 'frequenceCardiaque', 'frequence_cardiaque', 'valeur'],
      FR: ['FR', 'fr', 'frequenceRespiratoire', 'frequence_respiratoire', 'respiratoire', 'valeur'],
    };

    const keys = possibleKeys[metricType] || [];

    for (const key of keys) {
      if (data[key] !== undefined && data[key] !== null) {
        return String(data[key]);
      }
    }

    return '--';
  };

  // Vue d'ensemble
  const renderOverview = () => (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.overviewContainer}>
        {/* Carte info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📡 Données en temps réel</Text>
          <Text style={styles.infoText}>
            Les données biométriques sont collectées automatiquement par vos capteurs IoT ou saisies manuellement.
          </Text>
        </View>

        {/* Bouton saisie manuelle */}
        <TouchableOpacity
          style={{
            backgroundColor: manualMode ? '#E74C3C' : '#4A90E2',
            padding: 14,
            borderRadius: 10,
            marginBottom: 16,
          }}
          onPress={() => setManualMode(!manualMode)}
          disabled={sending}
        >
          <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: 'bold' }}>
            {manualMode ? '❌ Annuler saisie manuelle' : '✍️ Entrer les données manuellement'}
          </Text>
        </TouchableOpacity>

        {/* Formulaire manuel */}
        {manualMode && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✍️ Saisie manuelle</Text>

            {/* SpO2 */}
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.inputLabel}>💙 SpO₂ (Saturation en oxygène) %</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Ex: 98"
                value={manualValues.SpO2}
                onChangeText={(v) => setManualValues({ ...manualValues, SpO2: v })}
                style={styles.textInput}
                editable={!sending}
              />
            </View>

            {/* FC */}
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.inputLabel}>❤️ FC (Fréquence Cardiaque) bpm</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Ex: 72"
                value={manualValues.FC}
                onChangeText={(v) => setManualValues({ ...manualValues, FC: v })}
                style={styles.textInput}
                editable={!sending}
              />
            </View>

            {/* FR */}
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.inputLabel}>🫁 FR (Fréquence Respiratoire) tr/min</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Ex: 16"
                value={manualValues.FR}
                onChangeText={(v) => setManualValues({ ...manualValues, FR: v })}
                style={styles.textInput}
                editable={!sending}
              />
            </View>

            {/* Bouton Enregistrer */}
            <TouchableOpacity
              style={{
                backgroundColor: sending ? '#95A5A6' : '#27AE60',
                padding: 14,
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={handleSendManualData}
              disabled={sending}
            >
              <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: 'bold' }}>
                {sending ? '⏳ Envoi en cours...' : '📤 Envoyer'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Statut des capteurs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔌 Capteurs IoT</Text>

          <View style={styles.sensorCard}>
            <View style={styles.sensorHeader}>
              <Text style={styles.sensorName}>💙 MAX30100</Text>
              <View style={[styles.statusBadge, { backgroundColor: '#27AE60' }]}>
                <Text style={styles.statusText}>Connecté</Text>
              </View>
            </View>
            <Text style={styles.sensorDesc}>SpO₂ + Fréquence Cardiaque</Text>
            {latestData && (
              <View style={styles.sensorData}>
                <Text style={styles.sensorValue}>
                  SpO₂: {getMetricValue(latestData, 'SpO2')}%
                </Text>
                <Text style={styles.sensorValue}>
                  BPM: {getMetricValue(latestData, 'FC')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.sensorCard}>
            <View style={styles.sensorHeader}>
              <Text style={styles.sensorName}>🫁 MPU-6050</Text>
              <View style={[styles.statusBadge, { backgroundColor: '#27AE60' }]}>
                <Text style={styles.statusText}>Connecté</Text>
              </View>
            </View>
            <Text style={styles.sensorDesc}>Mouvement respiratoire</Text>
            {latestData && (
              <View style={styles.sensorData}>
                <Text style={styles.sensorValue}>
                  FR: {getMetricValue(latestData, 'FR')} tr/min
                </Text>
              </View>
            )}
          </View>

          <View style={styles.sensorCard}>
            <View style={styles.sensorHeader}>
              <Text style={styles.sensorName}>🌡️ DS18B20</Text>
              <View style={[styles.statusBadge, { backgroundColor: '#95A5A6' }]}>
                <Text style={styles.statusText}>En attente</Text>
              </View>
            </View>
            <Text style={styles.sensorDesc}>Température corporelle</Text>
          </View>

          <View style={styles.sensorCard}>
            <View style={styles.sensorHeader}>
              <Text style={styles.sensorName}>🎤 INMP441</Text>
              <View style={[styles.statusBadge, { backgroundColor: '#95A5A6' }]}>
                <Text style={styles.statusText}>En attente</Text>
              </View>
            </View>
            <Text style={styles.sensorDesc}>Analyse audio (Toux/Sifflement)</Text>
          </View>
        </View>

        {/* Dernières mesures */}
        {latestData && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Dernière mesure</Text>
            <Text style={styles.timestamp}>
              {new Date(latestData.createdAt || latestData.date || Date.now()).toLocaleString('fr-FR')}
            </Text>
            <View style={styles.dataGrid}>
              <View style={[styles.miniCard, { backgroundColor: '#E3F2FD' }]}>
                <Text style={styles.miniLabel}>💙 SpO₂</Text>
                <Text style={styles.miniValue}>{getMetricValue(latestData, 'SpO2')}%</Text>
              </View>
              <View style={[styles.miniCard, { backgroundColor: '#FFEBEE' }]}>
                <Text style={styles.miniLabel}>❤️ BPM</Text>
                <Text style={styles.miniValue}>{getMetricValue(latestData, 'FC')}</Text>
              </View>
              <View style={[styles.miniCard, { backgroundColor: '#F3E5F5' }]}>
                <Text style={styles.miniLabel}>🫁 FR</Text>
                <Text style={styles.miniValue}>{getMetricValue(latestData, 'FR')}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Statistiques */}
        {stats && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📈 Statistiques (7 jours)</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Mesures</Text>
                <Text style={styles.statValue}>{stats.nombreMesures || stats.totalMesures || 0}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Moyenne SpO₂</Text>
                <Text style={styles.statValue}>{stats.moyenneSpO2 || '--'}%</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Moyenne BPM</Text>
                <Text style={styles.statValue}>{stats.moyenneBPM || stats.moyenneFC || '--'}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );

  // Historique
  const renderHistory = () => (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.historyContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>Chargement de l'historique...</Text>
          </View>
        ) : history.length > 0 ? (
          history.map((item, index) => {
            const itemType = item.type || 'unknown';
            const itemValue = item.valeur || item.value || getMetricValue(item, itemType);
            const itemUnit = item.unite || item.unit || '';
            
            return (
              <View key={item._id || index} style={styles.historyItem}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyType}>
                    {(itemType === 'spo2' || itemType === 'SpO2') && '💙 Saturation'}
                    {(itemType === 'frequence_cardiaque' || itemType === 'FC') && '❤️ Fréquence Cardiaque'}
                    {(itemType === 'frequence_respiratoire' || itemType === 'FR') && '🫁 Fréquence Respiratoire'}
                    {!['SpO2', 'spo2', 'FC', 'frequence_cardiaque', 'FR', 'frequence_respiratoire'].includes(itemType) && '📊 Mesure'}
                  </Text>
                  <Text style={styles.historyDate}>
                    {new Date(item.createdAt || item.date || Date.now()).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                <Text style={styles.historyValue}>
                  {itemValue} {itemUnit}
                </Text>
                {item.source && (
                  <Text style={styles.historySource}>
                    Source: {item.source === 'manuel' ? '✍️ Saisie manuelle' : item.source}
                  </Text>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyText}>Aucune donnée enregistrée</Text>
            <Text style={styles.emptySubtext}>
              Les données des capteurs ou saisies manuelles apparaîtront ici automatiquement
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  // Graphiques
  const renderGraphs = () => (
    <ScrollView>
      <View style={styles.graphContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📈 Graphiques</Text>
          <Text style={styles.infoText}>
            Les graphiques d'évolution seront affichés ici une fois que suffisamment de données seront collectées.
          </Text>
        </View>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonIcon}>📊</Text>
          <Text style={styles.comingSoonText}>Graphiques en développement</Text>
          <Text style={styles.comingSoonSubtext}>
            Visualisation SpO₂, BPM et FR sur 24h/7j/30j
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
            📡 Vue d'ensemble
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            📊 Historique
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'graphs' && styles.tabActive]}
          onPress={() => setActiveTab('graphs')}
        >
          <Text style={[styles.tabText, activeTab === 'graphs' && styles.tabTextActive]}>
            📈 Graphiques
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'history' && renderHistory()}
      {activeTab === 'graphs' && renderGraphs()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  tabsContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  tab: { flex: 1, paddingVertical: 16, alignItems: 'center' },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#4A90E2' },
  tabText: { fontSize: 14, color: '#7F8C8D' },
  tabTextActive: { color: '#4A90E2', fontWeight: 'bold' },
  overviewContainer: { padding: 20 },
  infoCard: { backgroundColor: '#E3F2FD', padding: 16, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#4A90E2' },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#7F8C8D', lineHeight: 20 },
  section: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 16 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#2C3E50', marginBottom: 4 },
  textInput: { backgroundColor: '#F1F2F6', padding: 12, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#E0E0E0' },
  sensorCard: { backgroundColor: '#F8F9FA', padding: 16, borderRadius: 8, marginBottom: 12 },
  sensorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sensorName: { fontSize: 16, fontWeight: '600', color: '#2C3E50' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  sensorDesc: { fontSize: 14, color: '#7F8C8D', marginBottom: 8 },
  sensorData: { flexDirection: 'row', gap: 16 },
  sensorValue: { fontSize: 14, fontWeight: '600', color: '#4A90E2' },
  timestamp: { fontSize: 14, color: '#7F8C8D', marginBottom: 12 },
  dataGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  miniCard: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  miniLabel: { fontSize: 12, color: '#2C3E50', marginBottom: 4 },
  miniValue: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#7F8C8D', marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  historyContainer: { padding: 20 },
  loadingContainer: { paddingVertical: 40, alignItems: 'center' },
  loadingText: { marginTop: 16, fontSize: 16, color: '#7F8C8D' },
  historyItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#4A90E2' },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  historyType: { fontSize: 14, fontWeight: '600', color: '#2C3E50' },
  historyDate: { fontSize: 12, color: '#7F8C8D' },
  historyValue: { fontSize: 20, fontWeight: 'bold', color: '#4A90E2', marginBottom: 4 },
  historySource: { fontSize: 12, color: '#95A5A6', fontStyle: 'italic' },
  emptyState: { paddingVertical: 60, alignItems: 'center' },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#7F8C8D', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#95A5A6', textAlign: 'center' },
  graphContainer: { padding: 20 },
  comingSoon: { backgroundColor: '#FFFFFF', padding: 40, borderRadius: 12, alignItems: 'center' },
  comingSoonIcon: { fontSize: 64, marginBottom: 16 },
  comingSoonText: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  comingSoonSubtext: { fontSize: 14, color: '#7F8C8D', textAlign: 'center' },
});