import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { UserProvider } from '../src/context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <TabLayout />
    </UserProvider>
  );
}

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#7F8C8D',
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color: color }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Données',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color: color }}>📊</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Carte',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color: color }}>🗺️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alertes',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color: color }}>🔔</Text>
          ),
          tabBarBadge: 2,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color: color }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}