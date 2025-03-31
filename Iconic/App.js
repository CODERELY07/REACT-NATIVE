import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, ImageBackground } from 'react-native';

// Importing screens
import LoginScreen from './screens/LoginScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import HomeScreen from './screens/HomeScreen';
import ImageDetailScreen from './screens/ImageDetailScreen';
import RecipesScreen from './screens/RecipesScreen';
import SignUpScreen from './screens/SignUpScreen';
import AdminDrawer from './screens/AdminDrawer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* SignUp Screen */}
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />

        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* About Screen */}
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminDrawer}
          options={{ headerShown: false }}
        />

        {/* Recipes Screen */}
        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
          options={{ headerShown: false }}
        />

        {/* Contact Screen */}
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{ headerShown: false }}
        />

        {/* Image Detail Screen */}
        <Stack.Screen
          name="ImageDetail"
          component={ImageDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

