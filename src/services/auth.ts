import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../config/firebase';

export const signIn = async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
  try {
    return await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
  try {
    return await auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<FirebaseAuthTypes.UserCredential> => {
  try {
    // Get the users ID token
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const { accessToken } = await GoogleSignin.getTokens();
    
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(null, accessToken);
    
    // Sign-in the user with the credential
    return await auth().signInWithCredential(googleCredential);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (
  displayName?: string | null,
  photoURL?: string | null
): Promise<void> => {
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
