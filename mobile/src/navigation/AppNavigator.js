import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import colors from '../constants/colors';

// Auth Screens
import AuthScreen from '../screens/AuthScreen';

// Onboarding
import LanguageSelectScreen from '../screens/LanguageSelectScreen';

// Main Tab Screens
import HomeScreen from '../screens/HomeScreen';
import LessonScreen from '../screens/LessonScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CultureScreen from '../screens/CultureScreen';

// Kitchen/Recipe Screens
import KitchenScreen from '../screens/KitchenScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import CookingModeScreen from '../screens/CookingModeScreen';

// Social Screens
import FriendsScreen from '../screens/FriendsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const language = route?.params?.language || 'farsi';
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Learn':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Kitchen':
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              break;
            case 'Culture':
              iconName = focused ? 'globe' : 'globe-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        initialParams={{ language }}
      />
      <Tab.Screen 
        name="Learn" 
        component={HomeScreen}
        initialParams={{ language }}
      />
      <Tab.Screen 
        name="Kitchen" 
        component={KitchenScreen}
        initialParams={{ language }}
      />
      <Tab.Screen 
        name="Culture" 
        component={CultureScreen}
        initialParams={{ language }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        initialParams={{ language }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, isLoading, hasSelectedLanguage } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.backgroundSecondary,
          text: colors.text,
          border: colors.border,
          notification: colors.primary,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            {/* Language Selection - shown first or accessible from settings */}
            <Stack.Screen 
              name="LanguageSelect" 
              component={LanguageSelectScreen}
              options={{ animation: 'fade' }}
            />
            
            {/* Main Tab Navigator */}
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            
            {/* Lesson Screens */}
            <Stack.Screen 
              name="Lesson" 
              component={LessonScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen 
              name="Exercise" 
              component={ExerciseScreen}
              options={{
                animation: 'fade',
                gestureEnabled: false,
              }}
            />
            
            {/* Recipe/Cooking Screens */}
            <Stack.Screen 
              name="RecipeDetail" 
              component={RecipeDetailScreen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen 
              name="CookingMode" 
              component={CookingModeScreen}
              options={{
                animation: 'slide_from_bottom',
                gestureEnabled: false,
                presentation: 'fullScreenModal',
              }}
            />
            
            {/* Social Screens */}
            <Stack.Screen 
              name="Friends" 
              component={FriendsScreen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen 
              name="Leaderboard" 
              component={LeaderboardScreen}
              options={{ animation: 'slide_from_right' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
