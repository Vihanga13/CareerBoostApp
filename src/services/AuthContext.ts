import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext, useContext } from 'react';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  signUp: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<FirebaseAuthTypes.UserCredential>;
  updateUserProfile: (displayName?: string | null, photoURL?: string | null) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
