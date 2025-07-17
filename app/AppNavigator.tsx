import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './(tabs)/index';
import CardsScreen from './(tabs)/cards';
import BillsScreen from './(tabs)/bills';
import SettingsScreen from './(tabs)/settings';
import WalletScreen from './(tabs)/wallet';
import ReceiveScreen from './(tabs)/receive-screen';
import SendScreen from './(tabs)/send-screen';
import BasicInfoScreen from './(tabs)/basic-info';

import ProfileScreen from './drawer/profile';
import TransactionHistoryScreen from './drawer/transaction-history';
import SupportScreen from './drawer/support';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const WalletStack = createNativeStackNavigator();
const InfoStack = createNativeStackNavigator();

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Cards') iconName = 'card';
          else if (route.name === 'Bills') iconName = 'document-text';
          else if (route.name === 'Settings') iconName = 'settings';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="Bills" component={BillsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Wallet Stack Navigator
function WalletStackNavigator() {
  return (
    <WalletStack.Navigator screenOptions={{ headerShown: false }}>
      <WalletStack.Screen name="WalletMain" component={WalletScreen} />
      <WalletStack.Screen name="Receive" component={ReceiveScreen} />
      <WalletStack.Screen name="Send" component={SendScreen} />
    </WalletStack.Navigator>
  );
}

// ✅ Optional: If you want InfoUpdate to open like a full screen from Home
function InfoStackNavigator() {
  return (
    <InfoStack.Navigator screenOptions={{ headerShown: false }}>
      <InfoStack.Screen name="InfoUpdateScreen" component={BasicInfoScreen} />
    </InfoStack.Navigator>
  );
}

// Drawer Navigator (Root)
export default function AppNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Wallet" component={WalletStackNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Transaction History" component={TransactionHistoryScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />

      {/* ✅ Add this screen to allow redirect from Home */}
      <Drawer.Screen name="InfoUpdate" component={BasicInfoScreen} />
    </Drawer.Navigator>
  );
}
