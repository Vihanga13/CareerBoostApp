import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserCircle } from 'lucide-react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import ResumeScreen from '../screens/ResumeScreen';
import ListingsScreen from '../screens/ListingsScreen';
import SkillMatchScreen from '../screens/SkillMatchScreen';
import TipsScreen from '../screens/TipsScreen';
import QuizScreen from '../screens/QuizScreen';
import LoginPage from '../screens/login_page';
import RegisterPage from '../screens/register_page';
import ForgetPasswordPage from '../screens/ForgetPasswordPage';
import StudentDashboard from '../screens/StudentDashboard';
import { signOut } from '../services/auth';
import firestore from '@react-native-firebase/firestore';

type RootStackParamList = {
  Login: undefined;
  StudentDashboard: undefined;
  Resume: undefined;
  Listings: undefined;
  'Skill Match': undefined;
  'Interview Tips': undefined;
  Quizzes: undefined;
  RegisterPage: undefined;
  ForgetPasswordPage: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  initialUser: FirebaseAuthTypes.User | null;
}

const AppNavigator = ({ initialUser }: AppNavigatorProps) => {
  // No need for useNavigation here since we're handling auth state in App.tsx
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <RootStack.Navigator 
      initialRouteName={initialUser ? 'StudentDashboard' : 'Login'}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F8FAFC',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: '#1E293B',
          fontSize: 18,
        },
      }}
    >
      <RootStack.Screen 
        name="Login" 
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <RootStack.Screen 
        name="StudentDashboard" 
        component={StudentDashboard}
        options={{ 
          title: 'Dashboard',
          headerRight: () => (
            <TouchableOpacity 
              style={{ marginRight: 16 }} 
              onPress={handleSignOut}
            >
              <UserCircle size={24} color="#1E293B" />
            </TouchableOpacity>
          ),
        }}
      />
    
      <RootStack.Screen name="Resume" component={ResumeScreen} />
      <RootStack.Screen name="Listings" component={ListingsScreen} />
      <RootStack.Screen name="Skill Match" component={SkillMatchScreen} />
      <RootStack.Screen name="Interview Tips" component={TipsScreen} />
      <RootStack.Screen name="Quizzes" component={QuizScreen} />
      <RootStack.Screen 
        name="RegisterPage" 
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      <RootStack.Screen 
        name="ForgetPasswordPage" 
        component={ForgetPasswordPage}
        options={{ title: 'Reset Password' }}
      />
    </RootStack.Navigator>
  );
};

export default AppNavigator;