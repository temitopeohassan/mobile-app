import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Eye, EyeOff } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // 👈 import the auth context

export default function HomeScreen() {
  const { auth } = useAuth(); // 👈 get token and phoneNumber from context
  const phoneNumber = auth.phoneNumber;
  const token = auth.token;

  const [balanceVisible, setBalanceVisible] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!phoneNumber || !token) {
        console.warn('❌ Missing auth context:', { phoneNumber, token });
        setError('Missing authentication data. Please login again.');
        setLoading(false);
        return;
      }

      try {
        const url = `https://afrobank-backend-api.vercel.app/api/user/dashboard/${encodeURIComponent(phoneNumber)}`;
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(url, { headers });
        setUserInfo(response.data);
      } catch (err) {
        const message = err.response?.data?.error || 'Failed to fetch user data.';
        console.error('❌ API Error:', message);
        setError(message);
        Alert.alert('Error', message, [
          { text: 'OK' },
          { text: 'Retry', onPress: fetchUserData },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [phoneNumber, token]);

  const formatBalance = (balance) => {
    const num = parseFloat(balance || '0');
    return isNaN(num) ? '0.00' : num.toLocaleString('en-US', { minimumFractionDigits: 2 });
  };

  const formatPhoneNumber = (phone) => phone?.replace(/^\+234/, '0') || '...';
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
            {userInfo?.phoneNumber && (
              <Text style={styles.username}>{formatPhoneNumber(userInfo.phoneNumber)}</Text>
            )}
            {userInfo?.walletAddress && (
              <Text style={styles.walletAddress}>{formatWalletAddress(userInfo.walletAddress)}</Text>
            )}
            {userInfo?.blockchain && (
              <Text style={styles.blockchain}>{userInfo.blockchain.toUpperCase()} Network</Text>
            )}
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Balance */}
        {userInfo?.CNGNBalance && (
          <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>
                {userInfo?.CNGNSymbol || 'cNGN'} Balance
              </Text>
              <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                {balanceVisible ? <Eye size={20} color="#FFF" /> : <EyeOff size={20} color="#FFF" />}
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceAmount}>
              {balanceVisible
                ? `${formatBalance(userInfo?.CNGNBalance)} ${userInfo?.CNGNSymbol || 'cNGN'}`
                : '••••••••'}
            </Text>
          </LinearGradient>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24,
  },
  greeting: { fontSize: 14, color: '#6B7280', fontFamily: 'Inter-Regular' },
  username: { fontSize: 24, fontFamily: 'Inter-Bold', color: '#111827', marginTop: 4 },
  walletAddress: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#4B5563', marginTop: 4 },
  blockchain: { fontSize: 10, fontFamily: 'Inter-Medium', color: '#6B7280', marginTop: 2 },
  notificationButton: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center', elevation: 3,
  },
  balanceCard: { marginHorizontal: 24, borderRadius: 20, padding: 24, marginBottom: 32 },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  balanceLabel: { fontSize: 14, fontFamily: 'Inter-Medium', color: 'rgba(255, 255, 255, 0.8)' },
  balanceAmount: { fontSize: 36, fontFamily: 'Inter-Bold', color: '#FFF', marginBottom: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, fontFamily: 'Inter-Medium', color: '#6B7280' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  errorText: { fontSize: 16, fontFamily: 'Inter-Medium', color: '#EF4444', textAlign: 'center', marginBottom: 16 },
  retryButton: { backgroundColor: '#2563EB', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  retryButtonText: { color: '#FFF', fontSize: 14, fontFamily: 'Inter-Medium' },
});
