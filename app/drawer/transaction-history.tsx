import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Download,
} from 'lucide-react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACK_END_API } from '../constants/constants'; 


export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Replace this with the connected wallet address
  const address = '0xYourAddressHere';

  const filters = ['All', 'Deposits', 'Withdrawals'];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${BACK_END_API}/api/transactions/${address}`
        );
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
    if (parseFloat(amount) > 0) return 'deposit';
    if (parseFloat(amount) < 0) return 'withdrawal';
    return 'transfer';
  };

  const filtered = transactions.filter((tx) => {
    const type = getTypeFromAmount(tx.amount);
    if (selectedFilter === 'Deposits') return type === 'deposit';
    if (selectedFilter === 'Withdrawals') return type === 'withdrawal';
    return true;
  });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const maxPages = Math.ceil(filtered.length / pageSize);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft size={20} color="#059669" />;
      case 'withdrawal':
        return <ArrowUpRight size={20} color="#DC2626" />;
      default:
        return <ArrowUpRight size={20} color="#6B7280" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit':
        return '#059669';
      case 'withdrawal':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const getTransactionBgColor = (type) => {
    switch (type) {
      case 'deposit':
        return '#DCFCE7';
      case 'withdrawal':
        return '#FEE2E2';
      default:
        return '#F3F4F6';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Transaction History</Text>
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal contentContainerStyle={styles.filterRow}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.filterTabActive,
              ]}
              onPress={() => {
                setSelectedFilter(filter);
                setPage(1); // reset to page 1 on filter change
              }}
            >
              <Text
                style={[
                  styles.filterTabText,
                  selectedFilter === filter && styles.filterTabTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.transactionsList}>
              {paginated.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#9CA3AF' }}>
                  No transactions found.
                </Text>
              ) : (
                paginated.map((tx) => {
                  const type = getTypeFromAmount(tx.amount);
                  return (
                    <TouchableOpacity key={tx.id} style={styles.transactionItem}>
                      <View style={styles.transactionLeft}>
                        <View
                          style={[
                            styles.transactionIcon,
                            { backgroundColor: getTransactionBgColor(type) },
                          ]}
                        >
                          {getTransactionIcon(type)}
                        </View>
                        <View style={styles.transactionDetails}>
                          <Text style={styles.transactionTitle}>
                            {tx.asset?.symbol || tx.currency}
                          </Text>
                          <Text style={styles.transactionSubtitle}>
                            {tx.type} • {tx.status}
                          </Text>
                          <Text style={styles.transactionDateTime}>
                            {new Date(tx.createdAt).toLocaleString()}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.transactionAmount,
                          { color: getTransactionColor(type) },
                        ]}
                      >
                        {parseFloat(tx.amount) > 0 ? '+' : ''}
                        {tx.amount} {tx.asset?.symbol || ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          )}

          {/* Pagination Controls */}
          {!loading && filtered.length > 0 && (
            <View style={styles.pagination}>
              <TouchableOpacity
                disabled={page === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Text style={[styles.pageBtn, page === 1 && styles.pageBtnDisabled]}>Previous</Text>
              </TouchableOpacity>
              <Text style={styles.pageNumber}>Page {page} of {maxPages}</Text>
              <TouchableOpacity
                disabled={page === maxPages}
                onPress={() => setPage((p) => Math.min(maxPages, p + 1))}
              >
                <Text style={[styles.pageBtn, page === maxPages && styles.pageBtnDisabled]}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 20,
  },
  listContent: {
    paddingBottom: 40,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  transactionDate: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  transactionMeta: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  transactionStatus: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  separator: {
    height: 12,
  },
    filterRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    gap: 12,
    paddingHorizontal: 16,
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
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  pageBtn: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  pageBtnDisabled: {
    color: '#D1D5DB',
  },
  pageNumber: {
    fontSize: 16,
    color: '#6B7280',
  },
});
