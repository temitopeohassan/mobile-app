// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from './app/index';
import SignInScreen from './app/sign-in';
import SignUpScreen from './app/sign-up';
import OtpScreen from './app/otp';
import CompleteRegisterScreen from './app/complete-register';
import AppNavigator from './app/AppNavigator';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Otp: undefined;
  CompleteRegister: undefined;
  Home: {
    phoneNumber: string;
    token: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="CompleteRegister" component={CompleteRegisterScreen} />

        {/* Pass props through AppNavigator */}
        <Stack.Screen
          name="Home"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
