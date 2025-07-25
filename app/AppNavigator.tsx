import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Auth Screens
import SignInScreen from './sign-in';
import PhoneNumberScreen from './phone-number';
import PinInputScreen from './pin-input';
import ReturningUserSignInScreen from './ReturningUserSignInScreen';

// Tab Screens
import HomeScreen from './(tabs)/index';
import CardsScreen from './(tabs)/cards';
import BillsScreen from './(tabs)/bills';
import SettingsScreen from './(tabs)/settings';

// Drawer / Other Screens
import WalletScreen from './(tabs)/wallet';
import ReceiveScreen from './(tabs)/receive-screen';
import SendScreen from './(tabs)/send-screen';
import BasicInfoScreen from './(tabs)/basic-info';
import ProfileScreen from './drawer/profile';
import TransactionHistoryScreen from './drawer/transaction-history';
import SupportScreen from './drawer/support';

const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();
const WalletStack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tabs.Navigator
  screenOptions={({ route }) => ({
    headerShown: true, // ✅ enable top bar
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 16 }}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>
    ),
    tabBarIcon: ({ color, size }) => {
      const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
        Home: 'home',
        Cards: 'card',
        Bills: 'document-text',
        Settings: 'settings',
      };
      return <Ionicons name={icons[route.name]} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: 'gray',
  })}
>

      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Cards" component={CardsScreen} />
      <Tabs.Screen name="Bills" component={BillsScreen} />
      <Tabs.Screen name="Settings" component={SettingsScreen} />
    </Tabs.Navigator>
  );
}

function WalletNavigator() {
  return (
    <WalletStack.Navigator screenOptions={{ headerShown: false }}>
      <WalletStack.Screen name="WalletMain" component={WalletScreen} />
      <WalletStack.Screen name="Receive" component={ReceiveScreen} />
      <WalletStack.Screen name="Send" component={SendScreen} />
    </WalletStack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="Wallet" component={WalletNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="InfoUpdate" component={BasicInfoScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <RootStack.Screen name="SignIn" component={SignInScreen} />
      <RootStack.Screen name="PinInput" component={PinInputScreen} />
      <RootStack.Screen name="ReturningUserSignIn" component={ReturningUserSignInScreen} />
      <RootStack.Screen name="App" component={DrawerNavigator} />
    </RootStack.Navigator>
  );
}
