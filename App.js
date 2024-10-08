import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'; 
import HomeScreen from './App/Frontend/screens/HomeScreen';
import WelcomeScreen from './App/Frontend/screens/WelcomeScreen';
import LoginScreen from './App/Frontend/screens/LoginScreen';
import SignUpScreen from './App/Frontend/screens/SignUpScreen';
import IntroScreen from './App/Frontend/screens/IntroScreen';
import TimeTableScreen from './App/Frontend/screens/TimeTableScreen';
import GraduationScreen from './App/Frontend/screens/GraduationScreen';
import SmileScreen from './App/Frontend/screens/SmileScreen';
import HomePage from './App/Frontend/screens/HomePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          ...TransitionPresets.FadeFromBottomAndroid,
          headerShown: false,
        }}
      >
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Homep" component={HomeScreen} />
        <Stack.Screen name="TimeTable" component={TimeTableScreen} />
        <Stack.Screen name="Graduation" component={GraduationScreen} />
        <Stack.Screen name="Smile" component={SmileScreen} />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
