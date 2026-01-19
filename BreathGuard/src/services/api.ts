// src/services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api';

// ✅ GESTIONNAIRE DE STOCKAGE
const storage = {
  setToken: async (token: string) => {
    await AsyncStorage.setItem('userToken', token);
    console.log('[AUTH] ✅ Token sauvegardé:', token.substring(0, 20) + '...');
  },
  getToken: async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      console.log('[API] ✅ Token trouvé');
    } else {
      console.log('[API] ⚠️ Aucun token trouvé');
    }
    return token;
  },
  removeToken: async () => {
    await AsyncStorage.removeItem('userToken');
    console.log('[AUTH] 🗑️ Token supprimé');
  }
};

// ✅ CLIENT AXIOS AVEC INTERCEPTEURS
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur de requête - Ajouter le token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[API] ✅ Token ajouté au header');
    }
    return config;
  },
  (error) => {
    console.error('[API] ❌ Erreur intercepteur requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse - Gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('[API] ⚠️ Token expiré, déconnexion');
      await storage.removeToken();
    }
    console.error('[API] ❌ Erreur:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ========================================
// 🔐 AUTH API
// ========================================
export const authAPI = {
  // ✅ LOGIN - 2 paramètres séparés
  login: async (email: string, motDePasse: string) => {
    console.log('[API] 🔐 Appel login...');
    const response = await apiClient.post('/auth/login', { email, motDePasse });
    
    // ✅ SAUVEGARDER LE TOKEN
    if (response.data?.success && response.data?.data?.token) {
      await storage.setToken(response.data.data.token);
    }
    
    return response.data;
  },

  // ✅ SIGNUP - 4 paramètres OU 1 objet (support des 2)
  signup: async (
    nomOrData: string | { nom: string; prenom: string; email: string; motDePasse: string; telephone?: string },
    prenom?: string,
    email?: string,
    motDePasse?: string
  ) => {
    console.log('[API] 📝 Appel signup...');
    
    // ✅ Support des 2 formats d'appel
    let data;
    if (typeof nomOrData === 'string') {
      // Format : signup(nom, prenom, email, motDePasse)
      data = { nom: nomOrData, prenom: prenom!, email: email!, motDePasse: motDePasse! };
    } else {
      // Format : signup({ nom, prenom, email, motDePasse })
      data = nomOrData;
    }
    
    const response = await apiClient.post('/auth/signup', data);
    
    // ✅ SAUVEGARDER LE TOKEN
    if (response.data?.success && response.data?.data?.token) {
      await storage.setToken(response.data.data.token);
    }
    
    return response.data;
  },

  // ✅ GET ME (= getProfile)
  getMe: async () => {
    console.log('[API] 👤 Appel getMe...');
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // ✅ GET PROFILE (alias de getMe pour compatibilité)
  getProfile: async () => {
    console.log('[API] 👤 Appel getProfile...');
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // ✅ UPDATE PROFILE
  updateProfile: async (data: any) => {
    console.log('[API] ✏️ Appel updateProfile...');
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  },

  // ✅ LOGOUT
  logout: async () => {
    console.log('[API] 🚪 Appel logout...');
    await storage.removeToken();
    return { success: true };
  }
};

// ========================================
// 📊 DATA API
// ========================================
export const dataAPI = {
  // ✅ GET HISTORY - 1 nombre
  getHistory: async (limit: number = 10) => {
    console.log('[API] 📊 Appel getHistory, limit:', limit);
    const response = await apiClient.get(`/donnees/biometriques/historique?limit=${limit}`);
    console.log('[API] 📊 Réponse brute getHistory:', response.data);
    console.log('[DONNÉES] ✅ Historique récupéré:', response.data.data?.length || 0, 'entrées');
    return response.data;
  },

  // ✅ GET STATISTICS
  getStatistics: async () => {
    console.log('[API] 📈 Appel getStatistics...');
    const response = await apiClient.get('/donnees/statistics');
    return response.data;
  },

  // ✅ GET LATEST
  getLatest: async () => {
    console.log('[API] 🔄 Appel getLatest...');
    const response = await apiClient.get('/donnees/latest');
    return response.data;
  },

  // ✅ ADD DATA
  addData: async (data: any) => {
    console.log('[API] ➕ Appel addData...');
    const response = await apiClient.post('/donnees', data);
    return response.data;
  },

  // ✅ 🆕 SEND MANUAL DATA - FONCTION MANQUANTE
  sendManualData: async (data: {
    spo2?: number;
    frequenceCardiaque?: number;
    frequenceRespiratoire?: number;
  }) => {
    console.log('[API] 📤 Appel sendManualData...', data);
    
    // ✅ Validation des données
    const payload = {
      spo2: data.spo2 || null,
      frequenceCardiaque: data.frequenceCardiaque || null,
      frequenceRespiratoire: data.frequenceRespiratoire || null,
      source: 'manuel',
      dateHeure: new Date().toISOString()
    };
    
    console.log('[API] 📤 Payload envoyé:', payload);
    
    const response = await apiClient.post('/donnees/biometriques', payload);
    
    console.log('[API] ✅ Données envoyées avec succès:', response.data);
    
    return response.data;
  }
};

// ========================================
// 🚨 ALERT API
// ========================================
export const alertAPI = {
  // ✅ GET ALERTS
  getAlerts: async () => {
    console.log('[API] 🚨 Appel getAlerts...');
    const response = await apiClient.get('/alertes');
    return response.data;
  },

  // ✅ GET UNREAD ALERTS
  getUnreadAlerts: async () => {
    console.log('[API] 🚨 Appel getUnreadAlerts...');
    const response = await apiClient.get('/alertes?statut=non_lue');
    return response.data;
  },

  // ✅ ACKNOWLEDGE ALERT
  acknowledgeAlert: async (alertId: string) => {
    console.log('[API] ✅ Appel acknowledgeAlert:', alertId);
    const response = await apiClient.patch(`/alertes/${alertId}/acknowledge`);
    return response.data;
  },

  // ✅ MARK AS READ
  markAsRead: async (alertId: string) => {
    console.log('[API] ✅ Appel markAsRead:', alertId);
    const response = await apiClient.patch(`/alertes/${alertId}/read`);
    return response.data;
  },

  // ✅ MARK ALL AS READ
  markAllAsRead: async () => {
    console.log('[API] ✅ Appel markAllAsRead...');
    const response = await apiClient.patch('/alertes/read-all');
    return response.data;
  },

  // ✅ DELETE ALERT
  deleteAlert: async (alertId: string) => {
    console.log('[API] 🗑️ Appel deleteAlert:', alertId);
    const response = await apiClient.delete(`/alertes/${alertId}`);
    return response.data;
  }
};

// ========================================
// 🏥 SYMPTOM API
// ========================================
export const symptomAPI = {
  // ✅ GET SYMPTOMS
  getSymptoms: async () => {
    console.log('[API] 🏥 Appel getSymptoms...');
    const response = await apiClient.get('/symptomes');
    return response.data;
  },

  // ✅ ADD SYMPTOM
  addSymptom: async (symptom: any) => {
    console.log('[API] ➕ Appel addSymptom...');
    const response = await apiClient.post('/symptomes', symptom);
    return response.data;
  }
};

export default {
  authAPI,
  dataAPI,
  alertAPI,
  symptomAPI,
  storage
};