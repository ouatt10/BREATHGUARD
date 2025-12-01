import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const menuItems = [
    { icon: '👤', title: 'Informations Personnelles', subtitle: 'Nom, âge, contact' },
    { icon: '🏥', title: 'Historique Médical', subtitle: 'Maladies, allergies, traitements' },
    { icon: '📡', title: 'Mes Capteurs', subtitle: '2 capteurs connectés' },
    { icon: '🔔', title: 'Notifications', subtitle: 'Gérer les alertes' },
    { icon: '🔒', title: 'Confidentialité', subtitle: 'Données et sécurité' },
    { icon: '⚙️', title: 'Paramètres', subtitle: 'Langue, thème, unités' },
    { icon: '❓', title: 'Aide et Support', subtitle: 'FAQ, tutoriels' },
    { icon: 'ℹ️', title: 'À propos', subtitle: 'Version 1.0.0' },
  ];

  return (
    <View style={styles.container}>
      {/* Header avec profil */}
      <View style={styles.header}>
        <View style={styles.profilePicture}>
          <Text style={styles.profileInitials}>EO</Text>
        </View>
        <Text style={styles.profileName}>El Hadj OUATTARA</Text>
        <Text style={styles.profileEmail}>elhadjouattara302@email.com</Text>
      </View>

      {/* Menu */}
      <ScrollView style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text style={styles.menuIconText}>{item.icon}</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Bouton Déconnexion */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>🚪 Déconnexion</Text>
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
    padding: 30,
    paddingTop: 40,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#E8F4FD',
  },
  menu: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIconText: {
    fontSize: 22,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 3,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  menuArrow: {
    fontSize: 24,
    color: '#BDC3C7',
    fontWeight: '300',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#D9534F',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D9534F',
  },
});