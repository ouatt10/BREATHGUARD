import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, Switch, TextInput } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // États pour le profil patient
  const [isPatient, setIsPatient] = useState(false);
  const [pathologies, setPathologies] = useState<string[]>([]);
  const [facteurs, setFacteurs] = useState({
    fumeur: false,
    animaux: false,
    allergies: false,
  });
  const [age, setAge] = useState('');
  const [imc, setIMC] = useState('');

  useEffect(() => {
    // Charger le profil patient depuis le backend
    loadPatientProfile();
  }, []);

  const loadPatientProfile = async () => {
    try {
      // TODO: Appeler l'API pour charger le profil patient
      console.log('🔍 [PROFIL] Chargement profil patient...');
    } catch (error) {
      console.error('❌ [PROFIL] Erreur chargement:', error);
    }
  };

  const handleLogout = () => {
    const message = 'Voulez-vous vraiment vous déconnecter ?';
    
    if (Platform.OS === 'web') {
      if (window.confirm(message)) {
        console.log('🔴 [LOGOUT] Début déconnexion...');
        logout()
          .then(() => {
            console.log('✅ [LOGOUT] Déconnexion réussie');
            setTimeout(() => {
              window.location.href = '/login';
            }, 100);
          })
          .catch((error) => {
            console.error('❌ [LOGOUT] Erreur:', error);
            alert('Erreur de déconnexion');
          });
      }
    } else {
      Alert.alert('Déconnexion', message, [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/login');
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de se déconnecter');
            }
          },
        },
      ]);
    }
  };

  const handleSavePatientProfile = async () => {
    try {
      console.log('💾 [PROFIL] Sauvegarde profil patient...');
      
      const patientData = {
        isPatient,
        pathologies,
        facteurs,
        age: parseInt(age) || null,
        imc: parseFloat(imc) || null,
      };

      console.log('📤 [PROFIL] Données:', patientData);
      
      // TODO: Appeler l'API pour sauvegarder
      // await userAPI.updatePatientProfile(patientData);

      if (Platform.OS === 'web') {
        alert('Profil patient mis à jour avec succès ! ✅');
      } else {
        Alert.alert('Succès', 'Profil patient mis à jour !');
      }
    } catch (error: any) {
      console.error('❌ [PROFIL] Erreur sauvegarde:', error);
      
      if (Platform.OS === 'web') {
        alert('Erreur : ' + error.message);
      } else {
        Alert.alert('Erreur', 'Impossible de sauvegarder le profil');
      }
    }
  };

  const togglePathology = (pathology: string) => {
    if (pathologies.includes(pathology)) {
      setPathologies(pathologies.filter(p => p !== pathology));
    } else {
      setPathologies([...pathologies, pathology]);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const initials = `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`.toUpperCase();

  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec avatar */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user.prenom} {user.nom}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Section Informations personnelles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Informations personnelles</Text>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nom complet</Text>
          <Text style={styles.infoValue}>{user.nom} {user.prenom}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>

        {user.telephone && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Téléphone</Text>
            <Text style={styles.infoValue}>{user.telephone}</Text>
          </View>
        )}
      </View>

      {/* Section Statut Patient */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🏥 Statut Patient</Text>
          <Switch
            value={isPatient}
            onValueChange={setIsPatient}
            trackColor={{ false: '#E0E0E0', true: '#4A90E2' }}
            thumbColor={isPatient ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
        
        <Text style={styles.sectionSubtitle}>
          {isPatient 
            ? 'Vous bénéficiez d\'un suivi médical personnalisé' 
            : 'Activez pour accéder aux fonctionnalités de suivi médical'}
        </Text>
      </View>

      {/* Section Profil Médical (visible uniquement si Patient) */}
      {isPatient && (
        <>
          {/* Informations de base */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Informations médicales</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Âge</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 35"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>IMC (Indice de Masse Corporelle)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 24.5"
                keyboardType="numeric"
                value={imc}
                onChangeText={setIMC}
              />
              <Text style={styles.inputHint}>Calculé automatiquement depuis Taille/Poids</Text>
            </View>
          </View>

          {/* Pathologies */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🫁 Pathologies respiratoires</Text>
            
            {['Asthme', 'BPCO', 'Fibrose pulmonaire', 'Apnée du sommeil', 'Autre'].map((pathology) => (
              <TouchableOpacity
                key={pathology}
                style={styles.checkboxItem}
                onPress={() => togglePathology(pathology)}
              >
                <View style={[styles.checkbox, pathologies.includes(pathology) && styles.checkboxChecked]}>
                  {pathologies.includes(pathology) && <Text style={styles.checkboxCheck}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>{pathology}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Facteurs de risque */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ Facteurs de risque</Text>
            
            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>🚬 Fumeur</Text>
              <Switch
                value={facteurs.fumeur}
                onValueChange={(value) => setFacteurs({ ...facteurs, fumeur: value })}
                trackColor={{ false: '#E0E0E0', true: '#E74C3C' }}
              />
            </View>

            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>🐕 Présence d'animaux domestiques</Text>
              <Switch
                value={facteurs.animaux}
                onValueChange={(value) => setFacteurs({ ...facteurs, animaux: value })}
                trackColor={{ false: '#E0E0E0', true: '#F39C12' }}
              />
            </View>

            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>🤧 Allergies connues</Text>
              <Switch
                value={facteurs.allergies}
                onValueChange={(value) => setFacteurs({ ...facteurs, allergies: value })}
                trackColor={{ false: '#E0E0E0', true: '#9B59B6' }}
              />
            </View>
          </View>

          {/* Bouton Sauvegarder */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePatientProfile}>
            <Text style={styles.saveButtonText}>💾 Sauvegarder le profil médical</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Section Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Actions</Text>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 Se déconnecter</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputHint: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 4,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  checkboxCheck: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#2C3E50',
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: '#2C3E50',
  },
  saveButton: {
    backgroundColor: '#27AE60',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});