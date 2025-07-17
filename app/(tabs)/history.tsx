import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar, Download } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Income', 'Expense', 'Transfer'];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('https://afrobank-backend-api-temp.vercel.app/api/transactions');
        setTransactions(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load transactions:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getTypeFromAmount = (amount) => {
    if (parseFloat(amount) > 0) return 'income';
    if (parseFloat(amount) < 0) return 'expense';
    return 'transfer';
  };

  const filteredTransactions =
    selectedFilter === 'All'
      ? transactions
      : transactions.filter((tx) => getTypeFromAmount(tx.amount) === selectedFilter.toLowerCase());

  const getTransactionIcon = (type) => {
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

  const getTransactionColor = (type) => {
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

  const getTransactionBgColor = (type) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Transaction History</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerButton}><Calendar size={20} color="#374151" /></TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}><Download size={20} color="#374151" /></TouchableOpacity>
          </View>
        </View>

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

        <View style={styles.filterTabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabsContent}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[styles.filterTab, selectedFilter === filter && styles.filterTabActive]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[styles.filterTabText, selectedFilter === filter && styles.filterTabTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Summary (Static for now) */}
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={[styles.summaryAmount, { color: '#059669' }]}>N/A</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Expense</Text>
            <Text style={[styles.summaryAmount, { color: '#DC2626' }]}>N/A</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.transactionsList}>
              {filteredTransactions.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#9CA3AF' }}>
                  No transactions found.
                </Text>
              ) : (
                filteredTransactions.map((tx) => {
                  const type = getTypeFromAmount(tx.amount);
                  return (
                    <TouchableOpacity key={tx.id} style={styles.transactionItem}>
                      <View style={styles.transactionLeft}>
                        <View style={[styles.transactionIcon, { backgroundColor: getTransactionBgColor(type) }]}>
                          {getTransactionIcon(type)}
                        </View>
                        <View style={styles.transactionDetails}>
                          <Text style={styles.transactionTitle}>{tx.asset?.symbol || tx.currency}</Text>
                          <Text style={styles.transactionSubtitle}>{tx.type} • {tx.status}</Text>
                          <Text style={styles.transactionDateTime}>{new Date(tx.createdAt).toLocaleString()}</Text>
                        </View>
                      </View>
                      <Text style={[styles.transactionAmount, { color: getTransactionColor(type) }]}>
                        {parseFloat(tx.amount) > 0 ? '+' : ''}{tx.amount} {tx.asset?.symbol || ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
