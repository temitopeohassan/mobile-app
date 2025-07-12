import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Eye, EyeOff, Copy } from 'lucide-react-native';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';

export default function HomeScreen({ route }) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const phoneNumber = route?.params?.phoneNumber;
  const token = route?.params?.token;

  useEffect(() => {
    console.log('HomeScreen mounted with route params:', { phoneNumber, token });
  }, []);

  const fetchUserData = useCallback(async () => {
    if (!phoneNumber || !token) {
      console.warn('Missing phoneNumber or token');
      setError('Missing authentication parameters');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Making API request to:', `https://afrobank-backend-api.vercel.app/api/user/dashboard/${encodeURIComponent(phoneNumber)}`);
      console.log('With headers:', { Authorization: `Bearer ${token}` });

      const response = await axios.get(
        `https://afrobank-backend-api.vercel.app/api/user/dashboard/${encodeURIComponent(phoneNumber)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('API Response Status:', response.status);
      console.log('API Response Data:', JSON.stringify(response.data, null, 2));
      setUserInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch user info:', error.message);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, [phoneNumber, token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getShortWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleCopyWallet = () => {
    if (userInfo?.walletAddress) {
      Clipboard.setStringAsync(userInfo.walletAddress);
      Alert.alert('Copied', 'Wallet address copied to clipboard.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity onPress={fetchUserData} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
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
            {userInfo?.walletAddress ? (
              <View style={styles.walletRow}>
                <Text style={styles.walletAddress}>
                  {getShortWalletAddress(userInfo.walletAddress)}
                </Text>
                <TouchableOpacity onPress={handleCopyWallet} style={styles.copyButton}>
                  <Copy size={16} color="#4B5563" />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.walletAddress}>No wallet found</Text>
            )}
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>cNGN Balance</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
              {balanceVisible ? <Eye size={20} color="#FFFFFF" /> : <EyeOff size={20} color="#FFFFFF" />}
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {balanceVisible
              ? `${userInfo?.CNGNBalance || '0.00'} ${userInfo?.CNGNSymbol || 'cNGN'}`
              : '••••••••'}
          </Text>
        </LinearGradient>

        {/* Debug Info (optional) */}
        {__DEV__ && userInfo && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugText}>Debug Info:</Text>
            <Text style={styles.debugText}>Phone: {userInfo.phoneNumber}</Text>
            <Text style={styles.debugText}>Wallet: {userInfo.walletAddress}</Text>
            <Text style={styles.debugText}>Blockchain: {userInfo.blockchain}</Text>
            <Text style={styles.debugText}>Balance: {userInfo.CNGNBalance}</Text>
            <Text style={styles.debugText}>Symbol: {userInfo.CNGNSymbol}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  walletAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
  },
  copyButton: {
    marginLeft: 8,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceCard: {
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  balanceAmount: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
  },
  debugContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#333',
  },
});
