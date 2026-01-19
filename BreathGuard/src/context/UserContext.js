import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { authAPI, sensorAPI } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // État des capteurs
  const [hasSensors, setHasSensors] = useState(false);
  const [sensors, setSensors] = useState([]);
  
  // État du mode patient
  const [isPatient, setIsPatient] = useState(false);
  
  // Profil médical (si patient)
  const [medicalProfile, setMedicalProfile] = useState({
    diagnosis: '', // 'asthme' ou 'rhume'
    severity: '', // 'léger', 'modéré', 'sévère'
    allergies: [],
    medications: [],
    doctor: null,
    pathologies: [] // Depuis le backend
  });

  const [loading, setLoading] = useState(false);

  const { user, isAuthenticated } = useAuth();

  // Charger les données du profil utilisateur depuis le backend
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserData();
    }
  }, [isAuthenticated, user]);

  /**
   * Charger les données utilisateur depuis le backend
   */
  const loadUserData = async () => {
    try {
      setLoading(true);

      // Récupérer le profil complet
      const profileResponse = await authAPI.getProfile();
      if (profileResponse.success && profileResponse.data?.user) {
        const userData = profileResponse.data.user;

        // Mettre à jour isPatient
        setIsPatient(userData.isPatient || false);

        // Mettre à jour le profil médical
        if (userData.profileMedical) {
          setMedicalProfile({
            ...medicalProfile,
            ...userData.profileMedical,
            pathologies: userData.pathologies || []
          });
        }

        // Charger les capteurs
        await loadSensors();
      }
    } catch (error) {
      console.error('Erreur chargement données utilisateur:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Charger les capteurs de l'utilisateur
   */
  const loadSensors = async () => {
    try {
      const response = await sensorAPI.getSensors();
      if (response.success && response.data) {
        setSensors(response.data);
        setHasSensors(response.data.length > 0);
      }
    } catch (error) {
      console.error('Erreur chargement capteurs:', error);
      setSensors([]);
      setHasSensors(false);
    }
  };

  /**
   * Mettre à jour le profil médical sur le backend
   */
  const updateMedicalProfile = async (newProfile) => {
    try {
      setLoading(true);

      const response = await authAPI.updateProfile({
        isPatient: isPatient,
        profileMedical: newProfile
      });

      if (response.success) {
        setMedicalProfile(newProfile);
        return { success: true };
      }
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur mise à jour' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Ajouter un capteur
   */
  const addSensor = async (idCapteur, typeCapteur) => {
    try {
      setLoading(true);

      const response = await sensorAPI.addSensor({
        idCapteur,
        typeCapteur
      });

      if (response.success) {
        await loadSensors();
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('Erreur ajout capteur:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur ajout capteur' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Supprimer un capteur
   */
  const removeSensor = async (sensorId) => {
    try {
      setLoading(true);

      const response = await sensorAPI.deleteSensor(sensorId);

      if (response.success) {
        await loadSensors();
        return { success: true };
      }
    } catch (error) {
      console.error('Erreur suppression capteur:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur suppression' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Mettre à jour le mode patient
   */
  const updatePatientMode = async (newIsPatient) => {
    try {
      setLoading(true);

      const response = await authAPI.updateProfile({
        isPatient: newIsPatient
      });

      if (response.success) {
        setIsPatient(newIsPatient);
        return { success: true };
      }
    } catch (error) {
      console.error('Erreur mise à jour mode patient:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur mise à jour' 
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        // État capteurs
        hasSensors,
        setHasSensors,
        sensors,
        
        // État patient
        isPatient,
        setIsPatient: updatePatientMode,
        
        // Profil médical
        medicalProfile,
        setMedicalProfile: updateMedicalProfile,
        
        // Fonctions
        loadUserData,
        loadSensors,
        addSensor,
        removeSensor,
        
        // État
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};