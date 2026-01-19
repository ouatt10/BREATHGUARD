// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { authAPI } from '../services/api';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Charger les données au démarrage (UNE SEULE FOIS)
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        console.log('[AUTH] 🔍 Vérification token...');
        
        const token = await AsyncStorage.getItem('userToken');
        
        if (token) {
          console.log('[AUTH] ✅ Token trouvé');
          
          try {
            // ✅ CORRECTION : getProfile() → getMe()
            const response = await authAPI.getMe();
            
            if (response.success && response.data) {
              setUser(response.data);
              console.log('[AUTH] ✅ Utilisateur chargé:', response.data.email);
            }
          } catch (error) {
            console.error('[AUTH] ❌ Token invalide:', error);
            await AsyncStorage.removeItem('userToken');
            router.replace('/login');
          }
        } else {
          console.log('[AUTH] ⚠️ Aucun token trouvé');
          router.replace('/login');
        }
      } catch (error) {
        console.error('[AUTH] ❌ Erreur chargement:', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    loadStoredData();
  }, []); // ✅ Tableau vide = s'exécute UNE SEULE FOIS

  // FONCTION LOGIN
  const login = async (email: string, password: string) => {
    try {
      console.log('[AUTH] 🔐 Tentative de connexion...');
      console.log('[AUTH] 📧 Email:', email);
      
      const response = await authAPI.login(email, password);
      
      console.log('[AUTH] 📊 Réponse login:', response);
      
      if (response.success && response.data) {
        // ✅ Le token est déjà sauvegardé dans api.ts
        setUser(response.data.user || response.data);
        console.log('[AUTH] ✅ Connexion réussie, utilisateur:', response.data.email || response.data.user?.email);
        
        // ✅ REDIRECTION VERS LE DASHBOARD
        console.log('[AUTH] 🔄 Redirection vers Dashboard...');
        router.replace('/(tabs)');
      } else {
        throw new Error(response.message || 'Échec de la connexion');
      }
    } catch (error: any) {
      console.error('[AUTH] ❌ Erreur login:', error);
      throw new Error(error.response?.data?.message || error.message || 'Erreur de connexion');
    }
  };

  // FONCTION LOGOUT
  const logout = async () => {
    try {
      console.log('[AUTH] 🚪 Déconnexion...');
      
      // ✅ CORRECTION : Pas d'appel API, juste suppression du token
      await AsyncStorage.removeItem('userToken');
      setUser(null);
      
      console.log('[AUTH] ✅ Déconnexion réussie');
      router.replace('/login');
    } catch (error) {
      console.error('[AUTH] ❌ Erreur logout:', error);
      throw error;
    }
  };

  // FONCTION REGISTER
  const register = async (userData: any) => {
    try {
      console.log('[AUTH] 📝 Inscription...');
      console.log('[AUTH] 📊 Données:', userData);
      
      // ✅ CORRECTION : Extraire les champs de userData
      const { nom, prenom, email, motDePasse } = userData;
      
      if (!nom || !prenom || !email || !motDePasse) {
        throw new Error('Tous les champs sont requis');
      }
      
      // ✅ Appel avec 4 paramètres séparés
      const response = await authAPI.signup(nom, prenom, email, motDePasse);
      
      console.log('[AUTH] 📊 Réponse signup:', response);
      
      if (response.success) {
        console.log('[AUTH] ✅ Inscription réussie');
        
        // ✅ Le token est déjà sauvegardé dans api.ts
        if (response.data) {
          setUser(response.data.user || response.data);
          console.log('[AUTH] 🔄 Redirection vers Dashboard...');
          router.replace('/(tabs)');
        } else {
          router.replace('/login');
        }
      } else {
        throw new Error(response.message || 'Échec de l\'inscription');
      }
    } catch (error: any) {
      console.error('[AUTH] ❌ Erreur register:', error);
      throw new Error(error.response?.data?.message || error.message || 'Erreur d\'inscription');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalisé
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}