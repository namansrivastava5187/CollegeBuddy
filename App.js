import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack'; // Correct import
import HomeScreen from './App/Frontend/screens/HomeScreen';
import WelcomeScreen from './App/Frontend/screens/WelcomeScreen';
import LoginScreen from './App/Frontend/screens/LoginScreen';
import SignUpScreen from './App/Frontend/screens/SignUpScreen';
import IntroScreen from './App/Frontend/screens/IntroScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          ...TransitionPresets.FadeFromBottomAndroid, // or use SlideFromRightIOS for slide effect
          headerShown: false,
        }}
      >
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
