import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bell, 
  Eye, 
  EyeOff, 
  Send, 
  Download, 
  CreditCard, 
  Smartphone,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const quickActions = [
    { id: 1, title: 'Send Money', icon: Send, color: '#2563EB' },
    { id: 2, title: 'Receive', icon: Download, color: '#059669' },
    { id: 3, title: 'Pay Bills', icon: CreditCard, color: '#DC2626' },
    { id: 4, title: 'Top Up', icon: Smartphone, color: '#7C3AED' },
  ];

  const recentTransactions = [
    { id: 1, title: 'Netflix Subscription', amount: '-$15.99', type: 'expense', date: 'Today' },
    { id: 2, title: 'Salary Deposit', amount: '+$3,200.00', type: 'income', date: 'Yesterday' },
    { id: 3, title: 'Grocery Store', amount: '-$87.50', type: 'expense', date: '2 days ago' },
    { id: 4, title: 'Freelance Payment', amount: '+$450.00', type: 'income', date: '3 days ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.username}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={['#2563EB', '#1D4ED8']}
          style={styles.balanceCard}
        >
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
              {balanceVisible ? (
                <Eye size={20} color="#FFFFFF" />
              ) : (
                <EyeOff size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {balanceVisible ? '$12,547.80' : '••••••••'}
          </Text>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceChange}>
              <TrendingUp size={16} color="#10B981" />
              <Text style={styles.balanceChangeText}>+5.2% from last month</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickAction}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: transaction.type === 'income' ? '#DCFCE7' : '#FEE2E2' }
                  ]}>
                    {transaction.type === 'income' ? (
                      <ArrowDownLeft size={20} color="#059669" />
                    ) : (
                      <ArrowUpRight size={20} color="#DC2626" />
                    )}
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.type === 'income' ? '#059669' : '#DC2626' }
                ]}>
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
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
  username: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 4,
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
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceChangeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textAlign: 'center',
  },
  transactionsList: {
    paddingHorizontal: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});