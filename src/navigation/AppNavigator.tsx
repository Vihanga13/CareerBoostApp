import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserCircle } from 'lucide-react-native';
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
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const Stack = createStackNavigator();

interface AppNavigatorProps {
  initialUser: FirebaseAuthTypes.User | null;
}

const AppNavigator = ({ initialUser }: AppNavigatorProps) => {
  const navigation = useNavigation();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };
  // Change initial route based on auth state
  React.useEffect(() => {
    if (initialUser) {
      // TODO: Check user role in Firestore and navigate accordingly
      navigation.navigate('StudentDashboard');
    }
  }, [initialUser]);

  return (
    <Stack.Navigator 
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
      <Stack.Screen 
        name="Login" 
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
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
    
      <Stack.Screen name="Resume" component={ResumeScreen} />
      <Stack.Screen name="Listings" component={ListingsScreen} />
      <Stack.Screen name="Skill Match" component={SkillMatchScreen} />
      <Stack.Screen name="Interview Tips" component={TipsScreen} />
      <Stack.Screen name="Quizzes" component={QuizScreen} />
      <Stack.Screen 
        name="RegisterPage" 
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ForgetPasswordPage" 
        component={ForgetPasswordPage}
        options={{ title: 'Reset Password' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;