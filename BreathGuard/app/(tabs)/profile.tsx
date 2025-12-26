import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useUser } from '../../src/context/UserContext';

export default function ProfileScreen() {
  const { hasSensors, setHasSensors, isPatient, setIsPatient, medicalProfile } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleConnectSensors = () => {
    Alert.alert(
      'Connecter des capteurs',
      'Scannez le QR code de votre boîtier BreathGuard ou entrez le code manuellement.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Scanner QR Code', 
          onPress: () => {
            // Simuler la connexion
            setHasSensors(true);
            Alert.alert('Succès', 'Capteurs connectés avec succès ! 🎉');
          }
        },
      ]
    );
  };

  const handleDisconnectSensors = () => {
    Alert.alert(
      'Déconnecter les capteurs',
      'Êtes-vous sûr de vouloir déconnecter vos capteurs ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnecter', 
          style: 'destructive',
          onPress: () => {
            setHasSensors(false);
            Alert.alert('Déconnecté', 'Capteurs déconnectés.');
          }
        },
      ]
    );
  };

  const handleBecomePatient = () => {
    Alert.alert(
      'Devenir Patient',
      'Activez le mode Patient pour bénéficier du suivi médical. Vous pourrez renseigner votre diagnostic, traitement et médecin traitant.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Activer', 
          onPress: () => {
            setIsPatient(true);
            Alert.alert('Activé', 'Mode Patient activé ! Configurez votre profil médical. 🏥');
          }
        },
      ]
    );
  };

  const handleDisablePatientMode = () => {
    Alert.alert(
      'Désactiver le mode Patient',
      'Vos données médicales seront conservées mais masquées. Vous pourrez réactiver ce mode plus tard.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Désactiver', 
          style: 'destructive',
          onPress: () => {
            setIsPatient(false);
            Alert.alert('Désactivé', 'Mode Patient désactivé.');
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        {isPatient && (
          <View style={styles.patientBadge}>
            <Text style={styles.patientBadgeText}>👨‍⚕️ Patient</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.content}>
        {/* Informations personnelles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Informations Personnelles</Text>
          
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel}>Nom</Text>
            <View style={styles.itemRight}>
              <Text style={styles.itemValue}>El Hadj OUATTARA</Text>
              <Text style={styles.itemArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel}>Email</Text>
            <View style={styles.itemRight}>
              <Text style={styles.itemValue}>elhadjouattara302@email.com</Text>
              <Text style={styles.itemArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel}>Téléphone</Text>
            <View style={styles.itemRight}>
              <Text style={styles.itemValue}>+255 0768041147</Text>
              <Text style={styles.itemArrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Gestion des capteurs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Mes Capteurs IoT</Text>
          
          <View style={styles.sensorCard}>
            <View style={styles.sensorHeader}>
              <Text style={styles.sensorIcon}>🔌</Text>
              <View style={styles.sensorInfo}>
                <Text style={styles.sensorTitle}>Capteurs BreathGuard</Text>
                <View style={styles.sensorStatus}>
                  <View style={[styles.statusDot, { backgroundColor: hasSensors ? '#5CB85C' : '#E74C3C' }]} />
                  <Text style={[styles.statusText, { color: hasSensors ? '#5CB85C' : '#E74C3C' }]}>
                    {hasSensors ? 'Connectés' : 'Non connectés'}
                  </Text>
                </View>
              </View>
            </View>

            {hasSensors ? (
              <>
                <View style={styles.sensorDetails}>
                  <Text style={styles.sensorDetail}>📡 Modèle : ESP32-BreathGuard v2</Text>
                  <Text style={styles.sensorDetail}>🔋 Batterie : 87%</Text>
                  <Text style={styles.sensorDetail}>📶 Signal : Excellent</Text>
                  <Text style={styles.sensorDetail}>⏱️ Dernière sync : Il y a 2 min</Text>
                </View>
                <TouchableOpacity style={styles.disconnectButton} onPress={handleDisconnectSensors}>
                  <Text style={styles.disconnectButtonText}>Déconnecter</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.sensorDescription}>
                  Connectez votre boîtier de capteurs pour bénéficier du suivi biométrique automatique et de prédictions personnalisées.
                </Text>
                <TouchableOpacity style={styles.connectButton} onPress={handleConnectSensors}>
                  <Text style={styles.connectButtonText}>📷 Connecter mes capteurs</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Mode Patient */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏥 Suivi Médical</Text>
          
          {!isPatient ? (
            <View style={styles.patientCard}>
              <Text style={styles.patientCardIcon}>👨‍⚕️</Text>
              <Text style={styles.patientCardTitle}>Mode Patient</Text>
              <Text style={styles.patientCardText}>
                Activez le mode Patient pour accéder aux fonctionnalités de suivi médical : gestion de traitement, partage avec votre médecin, journal de santé détaillé.
              </Text>
              <TouchableOpacity style={styles.becomePatientButton} onPress={handleBecomePatient}>
                <Text style={styles.becomePatientButtonText}>Devenir Patient</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.patientActiveCard}>
                <View style={styles.patientActiveHeader}>
                  <Text style={styles.patientActiveIcon}>✅</Text>
                  <View style={styles.patientActiveInfo}>
                    <Text style={styles.patientActiveTitle}>Mode Patient Actif</Text>
                    <Text style={styles.patientActiveSubtitle}>Suivi médical activé</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemLabel}>Mon Diagnostic</Text>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemValue}>
                      {medicalProfile.diagnosis || 'Non renseigné'}
                    </Text>
                    <Text style={styles.itemArrow}>›</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemLabel}>Mon Traitement</Text>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemValue}>
                      {medicalProfile.medications?.length || 0} médicament(s)
                    </Text>
                    <Text style={styles.itemArrow}>›</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemLabel}>Mon Médecin</Text>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemValue}>
                      {medicalProfile.doctor?.name || 'Non renseigné'}
                    </Text>
                    <Text style={styles.itemArrow}>›</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.disablePatientButton} 
                  onPress={handleDisablePatientMode}
                >
                  <Text style={styles.disablePatientButtonText}>Désactiver le mode Patient</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Paramètres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Paramètres</Text>
          
          <View style={styles.item}>
            <Text style={styles.itemLabel}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#4A90E2' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel}>Confidentialité</Text>
            <Text style={styles.itemArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel}>Aide & Support</Text>
            <Text style={styles.itemArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel}>À propos</Text>
            <Text style={styles.itemArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>🚪 Se déconnecter</Text>
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
  content: {
    flex: 1,
    padding: 20
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: '#7F8C8D',
    marginRight: 5,
  },
  itemArrow: {
    fontSize: 18,
    color: '#7F8C8D',
  },
  sensorCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sensorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sensorIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  sensorInfo: {
    flex: 1,
  },
  sensorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  sensorStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sensorDetails: {
    backgroundColor: '#F5F7FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sensorDetail: {
    fontSize: 13,
    color: '#2C3E50',
    marginBottom: 5,
  },
  sensorDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 15,
  },
  connectButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disconnectButton: {
    backgroundColor: '#E74C3C',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  disconnectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  patientCard: {
    backgroundColor: '#E8F4FD',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
  },
  patientCardIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  patientCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  patientCardText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  becomePatientButton: {
    backgroundColor: '#5CB85C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  becomePatientButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  patientActiveCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientActiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  patientActiveIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  patientActiveInfo: {
    flex: 1,
  },
  patientActiveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  patientActiveSubtitle: {
    fontSize: 14,
    color: '#5CB85C',
    marginTop: 2,
  },
  disablePatientButton: {
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  disablePatientButtonText: {
    color: '#E74C3C',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});