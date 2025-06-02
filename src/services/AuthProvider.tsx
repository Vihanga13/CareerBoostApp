import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { AuthContext } from './AuthContext';
import {
  signIn,
  signUp,
  signOut,
  resetPassword,
  signInWithGoogle,
  updateUserProfile,
} from './authFunctions';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(auth().currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    signInWithGoogle,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
