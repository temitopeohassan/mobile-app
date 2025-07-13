// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './app/index';
import SignInScreen from './app/sign-in';
import SignUpScreen from './app/sign-up';
import OtpScreen from './app/otp';
import CompleteRegisterScreen from './app/complete-register';
import CreateCardsScreen from './app/(tabs)/create-card';
import AppNavigator from './app/AppNavigator'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} /> 
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="CompleteRegister" component={CompleteRegisterScreen} />
        <Stack.Screen name="CreateCards" component={CreateCardsScreen} />
        <Stack.Screen name="Home" component={AppNavigator} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
