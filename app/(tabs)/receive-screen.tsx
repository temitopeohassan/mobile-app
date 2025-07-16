import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function ReceiveScreen(): JSX.Element {
  const { auth } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Wallet Address</Text>
      <View style={styles.card}>
        <Text selectable style={styles.address}>
          {auth.walletAddress || 'No wallet address found'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
    alignItems: 'center',
  },
  address: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
});
