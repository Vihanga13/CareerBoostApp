import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign In
GoogleSignin.configure({
  webClientId: 'your-web-client-id', // Get this from your Google Cloud Console
});

export { auth, GoogleSignin };
