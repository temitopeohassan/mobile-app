// app/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import HomeScreen from './(tabs)/index';
import CardsScreen from './(tabs)/cards';      // Optional
import BillsScreen from './(tabs)/bills';      // Optional
import SettingsScreen from './(tabs)/settings'; // Optional

import { RootStackParamList } from '../App';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
};

const Tab = createBottomTabNavigator();

export default function AppNavigator({ route }: Props) {
  const { phoneNumber, token } = route.params;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        initialParams={{ phoneNumber, token }}
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="Bills" component={BillsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
