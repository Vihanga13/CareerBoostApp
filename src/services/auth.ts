export { AuthProvider } from './AuthProvider';
export { useAuth } from './AuthContext';
export {
  signIn,
  signUp,
  signOut,
  resetPassword,
  signInWithGoogle,
  updateUserProfile,
} from './authFunctions';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      return await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      return await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return await auth().signInWithCredential(googleCredential);
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (
    displayName?: string | null,
    photoURL?: string | null
  ) => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({ displayName, photoURL });
      } else {
        throw new Error('No user is currently signed in');
      }
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut: signOutUser,
    resetPassword,
    signInWithGoogle,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider } from './AuthProvider';
export { useAuth } from './AuthContext';
export {
  signIn,
  signUp,
  signOut,
  resetPassword,
  signInWithGoogle,
  updateUserProfile,
} from './authFunctions';
