import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, GraduationCap, Building } from 'lucide-react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUp, signInWithGoogle, updateUserProfile } from '../services/auth';
import { validateEmail } from '../utils/helpers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  university?: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  university: string;
}

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleRegister = async () => {
    // Validate form
    if (!formData.fullName) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!formData.email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!validateEmail(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!formData.password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (selectedRole === 'student' && !formData.university) {
      Alert.alert('Error', 'Please enter your university');
      return;
    }

    setIsLoading(true);
    try {
      // Create user with email and password
      const userCredential = await signUp(formData.email, formData.password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateUserProfile(formData.fullName);

      // Save additional user data to Firestore
      await firestore().collection('users').doc(user.uid).set({
        fullName: formData.fullName,
        email: formData.email,
        role: selectedRole,
        university: selectedRole === 'student' ? formData.university : null,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp()
      });

      Alert.alert(
        'Registration Successful', 
        'You have been registered successfully!',
        [{ text: 'OK', onPress: () => navigation.navigate('StudentDashboard') }]
      );
    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
        error.message || 'An error occurred during registration'
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      // Sign in with Google
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      
      // Check if user already exists in Firestore
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      
      if (!userDoc.exists) {
        // If new user, save their data to Firestore
        await firestore().collection('users').doc(user.uid).set({
          fullName: user.displayName,
          email: user.email,
          role: selectedRole,
          university: null, // Can be updated later in profile
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp()
        });
      }

      navigation.navigate('StudentDashboard');
    } catch (error: any) {
      Alert.alert(
        'Google Sign Up Failed',
        error.message || 'An error occurred during Google sign up'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>CB</Text>
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join CareerBoost and boost your career</Text>
        </View>

        {/* Register Form */}
        <View style={styles.form}>
          
          {/* User Role Selection */}
          <View style={styles.roleSelection}>
            <Text style={styles.label}>
              I am a
            </Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                onPress={() => setSelectedRole('student')}
                style={[styles.roleButton, selectedRole === 'student' && styles.selectedRoleButton]}
              >
                <GraduationCap />
                <Text style={styles.roleButtonText}>Student</Text>
                {selectedRole === 'student' && <View style={styles.selectedIndicator} />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedRole('employer')}
                style={[styles.roleButton, selectedRole === 'employer' && styles.selectedRoleButton]}
              >
                <Building />
                <Text style={styles.roleButtonText}>Employer</Text>
                {selectedRole === 'employer' && <View style={styles.selectedIndicator} />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Full Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Full Name
            </Text>
            <TextInput
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              style={styles.textInput}
              placeholder="Enter your full name"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {selectedRole === 'student' ? 'University Email' : 'Email Address'}
            </Text>
            <TextInput
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              style={styles.textInput}
              placeholder={selectedRole === 'student' ? 'name@university.edu' : 'Enter your email'}
              keyboardType="email-address"
            />
          </View>

          {/* University Input - Only for Students */}
          {selectedRole === 'student' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                University
              </Text>
              <TextInput
                value={formData.university}
                onChangeText={(value) => handleInputChange('university', value)}
                style={styles.textInput}
                placeholder="Enter your university name"
              />
            </View>
          )}

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Password
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                style={styles.textInput}
                placeholder="Create a strong password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Confirm Password
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                style={styles.textInput}
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity
              onPress={() => console.log('Terms of Service')}
              style={styles.termsButton}
            >
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.linkText}>
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text style={styles.linkText}>
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            style={[styles.registerButton, selectedRole === 'student' ? styles.studentButton : styles.employerButton]}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.registerButtonText}>Create Account</Text>
                <ArrowRight size={18} />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or sign up with</Text>
          <View style={styles.divider} />
        </View>

        {/* Google Signup Button */}
        <TouchableOpacity
          onPress={handleGoogleSignup}
          style={styles.googleButton}
        >
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginLinkText}>
            Already have an account?{' '}
            <TouchableOpacity
              onPress={() => console.log('Navigate to login')}
            >
              <Text style={styles.signInText}>
                Sign in here
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'linear-gradient(to right, #2563eb, #2dd4bf)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    marginBottom: 24,
  },
  roleSelection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedRoleButton: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 8,
    color: '#2563eb',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
  },
  inputGroup: {
    marginBottom: 16,
  },
  textInput: {
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#f9fafb',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  eyeButton: {
    padding: 12,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    color: '#6b7280',
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsButton: {
    padding: 12,
  },
  termsText: {
    fontSize: 14,
    color: '#374151',
  },
  linkText: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  registerButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  studentButton: {
    backgroundColor: 'linear-gradient(to right, #2563eb, #2dd4bf)',
  },
  employerButton: {
    backgroundColor: 'linear-gradient(to right, #4ade80, #22c55e)',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    color: '#fff',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    flex: 1,
    backgroundColor: '#e5e7eb',
  },
  orText: {
    fontSize: 14,
    color: '#6b7280',
    paddingHorizontal: 8,
  },
  googleButton: {
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  loginLinkContainer: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#6b7280',
  },
  signInText: {
    color: '#2563eb',
    fontWeight: '500',
  },
});

export default RegisterScreen;