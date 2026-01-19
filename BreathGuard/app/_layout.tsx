import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(tabs)';

    console.log('[LAYOUT] 📍 Segments:', segments);
    console.log('[LAYOUT] 👤 User:', user ? 'connecté' : 'non connecté');
    console.log('[LAYOUT] 📂 Dans (tabs)?', inAuthGroup);

    if (!user && inAuthGroup) {
      // Utilisateur non connecté essaie d'accéder aux tabs
      console.log('[LAYOUT] ⚠️ Non authentifié, redirection vers /login');
      router.replace('/login');
    } else if (user && !inAuthGroup) {
      // Utilisateur connecté est sur login/signup
      console.log('[LAYOUT] ✅ Authentifié, redirection vers /(tabs)');
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}