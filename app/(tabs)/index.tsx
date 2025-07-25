import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { useAuth } from '../context/AuthContext';
import { BACK_END_API } from '../constants/constants';

import {
  Bell, Eye, EyeOff,
  Send, Download, Plus
} from 'lucide-react-native';

export default function HomeScreen() {
  const { auth } = useAuth();
  const navigation = useNavigation();

  const [balanceVisible, setBalanceVisible] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    if (!auth?.phoneNumber || !auth?.token) {
      setError('Missing authentication data. Please login again.');
      setLoading(false);
      return;
    }

    try {
      const url = `${BACK_END_API}/api/user/dashboard/${encodeURIComponent(auth.phoneNumber)}`;
      const headers = {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(url, { headers });
      setUserInfo(response.data);
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to fetch user data.';
      setError(message);

      Alert.alert('Error', message, [
        { text: 'OK' },
        { text: 'Retry', onPress: fetchUserData },
      ]);

      // Optional: Handle token expiration
      // if (err.response?.status === 401) {
      //   logout(); // you can call setAuth(null) if you implement logout logic
      // }
    } finally {
      setLoading(false);
    }
  }, [auth?.phoneNumber, auth?.token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);



  const formatBalance = (balance) => {
    const num = parseFloat(balance || '0');
    return isNaN(num) ? '0.00' : num.toLocaleString('en-US', { minimumFractionDigits: 2 });
  };

  const formatWalletAddress = (addr) =>
    addr?.length > 10 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !userInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Unknown error occurred'}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              setError(null);
              fetchUserData();
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.username}>{userInfo.firstName || '...'}</Text>
            <Text style={styles.walletAddress}>{formatWalletAddress(userInfo.walletAddress)}</Text>
            <Text style={styles.blockchain}>{userInfo.blockchain?.toUpperCase()} Network</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>{userInfo.CNGNSymbol || 'cNGN'} Balance</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
              {balanceVisible ? <Eye size={20} color="#FFF" /> : <EyeOff size={20} color="#FFF" />}
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {balanceVisible
              ? `${formatBalance(userInfo.CNGNBalance)} ${userInfo.CNGNSymbol || 'cNGN'}`
              : '••••••••'}
          </Text>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#2563EB' }]}>
              <Send size={24} color="#FFF" />
            </View>
            <Text style={styles.quickActionText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#059669' }]}>
              <Download size={24} color="#FFF" />
            </View>
            <Text style={styles.quickActionText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#DC2626' }]}>
              <Plus size={24} color="#FFF" />
            </View>
            <Text style={styles.quickActionText}>Top Up</Text>
          </TouchableOpacity>
        </View>

        {/* Wallet Button */}
        <TouchableOpacity style={styles.walletButton} onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.walletButtonText}>Wallet</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: { fontSize: 14, color: '#6B7280', fontFamily: 'Inter-Regular' },
  username: { fontSize: 24, fontFamily: 'Inter-Bold', color: '#111827', marginTop: 4 },
  walletAddress: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#4B5563', marginTop: 4 },
  blockchain: { fontSize: 10, fontFamily: 'Inter-Medium', color: '#6B7280', marginTop: 2 },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  balanceCard: {
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: { fontSize: 14, fontFamily: 'Inter-Medium', color: 'rgba(255, 255, 255, 0.8)' },
  balanceAmount: { fontSize: 36, fontFamily: 'Inter-Bold', color: '#FFF', marginBottom: 16 },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },

  walletButton: {
    backgroundColor: '#1D4ED8',
    marginHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  walletButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, fontFamily: 'Inter-Medium', color: '#6B7280' },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
   quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: { color: '#FFF', fontSize: 14, fontFamily: 'Inter-Medium' },
});