import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar,
  Download
} from 'lucide-react-native';
import { useState } from 'react';

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const filters = ['All', 'Income', 'Expense', 'Transfer'];
  
  const transactions = [
    { id: 1, title: 'Salary Deposit', subtitle: 'Monthly salary', amount: '+$3,200.00', type: 'income', date: 'Today', time: '09:30 AM' },
    { id: 2, title: 'Netflix Subscription', subtitle: 'Entertainment', amount: '-$15.99', type: 'expense', date: 'Today', time: '08:15 AM' },
    { id: 3, title: 'Transfer to Savings', subtitle: 'Internal transfer', amount: '-$500.00', type: 'transfer', date: 'Yesterday', time: '02:45 PM' },
    { id: 4, title: 'Grocery Store', subtitle: 'Food & Dining', amount: '-$87.50', type: 'expense', date: 'Yesterday', time: '11:20 AM' },
    { id: 5, title: 'Freelance Payment', subtitle: 'Design work', amount: '+$450.00', type: 'income', date: '2 days ago', time: '04:30 PM' },
    { id: 6, title: 'Electric Bill', subtitle: 'Utilities', amount: '-$89.50', type: 'expense', date: '2 days ago', time: '10:15 AM' },
    { id: 7, title: 'Cashback Reward', subtitle: 'Credit card reward', amount: '+$23.75', type: 'income', date: '3 days ago', time: '03:20 PM' },
    { id: 8, title: 'Coffee Shop', subtitle: 'Food & Dining', amount: '-$12.50', type: 'expense', date: '3 days ago', time: '07:45 AM' },
    { id: 9, title: 'Online Shopping', subtitle: 'Amazon purchase', amount: '-$156.99', type: 'expense', date: '4 days ago', time: '06:30 PM' },
    { id: 10, title: 'Dividend Payment', subtitle: 'Investment return', amount: '+$75.00', type: 'income', date: '5 days ago', time: '12:00 PM' },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <ArrowDownLeft size={20} color="#059669" />;
      case 'expense':
        return <ArrowUpRight size={20} color="#DC2626" />;
      case 'transfer':
        return <ArrowUpRight size={20} color="#2563EB" />;
      default:
        return <ArrowUpRight size={20} color="#6B7280" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'income':
        return '#059669';
      case 'expense':
        return '#DC2626';
      case 'transfer':
        return '#2563EB';
      default:
        return '#6B7280';
    }
  };

  const getTransactionBgColor = (type: string) => {
    switch (type) {
      case 'income':
        return '#DCFCE7';
      case 'expense':
        return '#FEE2E2';
      case 'transfer':
        return '#DBEAFE';
      default:
        return '#F3F4F6';
    }
  };

  const filteredTransactions = selectedFilter === 'All' 
    ? transactions 
    : transactions.filter(t => t.type === selectedFilter.toLowerCase());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Transaction History</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerButton}>
              <Calendar size={20} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Download size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabsContent}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  selectedFilter === filter && styles.filterTabActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedFilter === filter && styles.filterTabTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={[styles.summaryAmount, { color: '#059669' }]}>+$3,748.75</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Expense</Text>
            <Text style={[styles.summaryAmount, { color: '#DC2626' }]}>-$872.48</Text>
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.transactionsList}>
            {filteredTransactions.map((transaction) => (
              <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: getTransactionBgColor(transaction.type) }
                  ]}>
                    {getTransactionIcon(transaction.type)}
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
                    <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
                    <Text style={styles.transactionDateTime}>
                      {transaction.date} • {transaction.time}
                    </Text>
                  </View>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: getTransactionColor(transaction.type) }
                ]}>
                  {transaction.amount}
                </Text>
              </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  filterButton: {
    padding: 4,
  },
  filterTabs: {
    marginBottom: 24,
  },
  filterTabsContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterTabActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  summaryCards: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    paddingHorizontal: 24,
    marginBottom: 16,
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
  transactionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  transactionDateTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});