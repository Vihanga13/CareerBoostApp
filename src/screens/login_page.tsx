import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
} from 'react-native-reanimated';
import AnimatedBackground from '../components/AnimatedBackground';
import { signIn, signInWithGoogle } from '../services/auth';
import { validateEmail } from '../utils/helpers';

const { width } = Dimensions.get('window');

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const getFirebaseErrorMessage = (error: any) => {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return error.message || 'An error occurred during login.';
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signIn(formData.email, formData.password);
      // Don't navigate here - let the auth state change handler do it
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        getFirebaseErrorMessage(error)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      // Don't navigate here - let the auth state change handler do it
    } catch (error: any) {
      Alert.alert(
        'Google Sign In Failed',
        error.code === 'auth/cancelled-popup-request'
          ? 'Sign in was cancelled.'
          : error.message || 'An error occurred during Google sign in'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <AnimatedBackground />
      
      <View style={styles.innerContainer}>
        <Animated.View 
          entering={FadeInDown.delay(200).springify()} 
          style={styles.headerIconBox}
        >
          <Text style={styles.headerIconText}>CB</Text>
        </Animated.View>

        <Animated.Text 
          entering={FadeInDown.delay(400).springify()}
          style={styles.headerTitle}
        >
          Welcome Back
        </Animated.Text>
        
        <Animated.Text 
          entering={FadeInDown.delay(600).springify()}
          style={styles.headerSubtitle}
        >
          Sign in to your CareerBoost account
        </Animated.Text>

        <Animated.View 
          entering={FadeInUp.delay(800).springify()}
          style={styles.formBox}
        >
          <Text style={styles.label}>Email Address</Text>
          <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
            <Mail size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          </View>
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          <Text style={styles.label}>Password</Text>
          <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
            <Lock size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              textContentType="password"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('ForgetPasswordPage')}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.loginButtonText}>Sign In</Text>
                <ArrowRight size={18} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <View style={styles.googleIconContainer}>
              <Text style={styles.googleLogoText}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(1000).springify()}
          style={styles.registerContainer}
        >
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('RegisterPage')}
            >
              Sign up here
            </Text>
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(1200).springify()}
          style={styles.footerContainer}
        >
          <Text style={styles.footerText}>
            By signing in, you agree to our{' '}
            <Text style={styles.footerLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </Text>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  headerIconBox: {
    width: 80,
    height: 80,
    backgroundColor: '#2563EB',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  headerIconText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#64748B',
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  formBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(241, 245, 249, 0.9)',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginTop: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    paddingHorizontal: 8,
  },
  eyeButton: {
    padding: 4,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#64748B',
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  googleLogoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  googleButtonText: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    marginTop: 32,
  },
  registerText: {
    color: '#64748B',
    fontSize: 14,
  },
  registerLink: {
    color: '#2563EB',
    fontWeight: '600',
  },
  footerContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },
  footerLink: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 4,
  },
});

export default LoginPage;