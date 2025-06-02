interface FirebaseErrorMessages {
  [key: string]: string;
}

export const authErrorMessages: FirebaseErrorMessages = {
  'auth/invalid-email': 'Invalid email address format.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/operation-not-allowed': 'This operation is not allowed.',
  'auth/weak-password': 'The password is too weak.',
  'auth/invalid-credential': 'Invalid credentials.',
  'auth/invalid-verification-code': 'Invalid verification code.',
  'auth/invalid-verification-id': 'Invalid verification ID.',
  'auth/missing-verification-code': 'Missing verification code.',
  'auth/missing-verification-id': 'Missing verification ID.',
  'auth/credential-already-in-use': 'This credential is already associated with another account.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
  'auth/cancelled-popup-request': 'Sign in was cancelled.',
  'auth/popup-blocked': 'Sign in popup was blocked by your browser.',
  'auth/popup-closed-by-user': 'Sign in was cancelled.',
  'auth/network-request-failed': 'Network connection failed. Please check your internet connection.',
};

export const getFirebaseErrorMessage = (error: any): string => {
  const errorCode = error.code as string;
  return authErrorMessages[errorCode] || error.message || 'An unknown error occurred.';
};
