import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // État des capteurs
  const [hasSensors, setHasSensors] = useState(false);
  
  // État du mode patient
  const [isPatient, setIsPatient] = useState(false);
  
  // Profil médical (si patient)
  const [medicalProfile, setMedicalProfile] = useState({
    diagnosis: '', // 'asthme' ou 'rhume'
    severity: '', // 'léger', 'modéré', 'sévère'
    allergies: [],
    medications: [],
    doctor: null
  });

  return (
    <UserContext.Provider 
      value={{
        hasSensors,
        setHasSensors,
        isPatient,
        setIsPatient,
        medicalProfile,
        setMedicalProfile
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