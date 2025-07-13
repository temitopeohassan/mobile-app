import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ListRenderItem,
} from 'react-native';

type Transaction = {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Success' | 'Failed';
};

const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Netflix Subscription',
    date: '2025-07-12',
    amount: -5500,
    status: 'Completed',
  },
  {
    id: '2',
    title: 'POS Purchase - Supermart',
    date: '2025-07-11',
    amount: -12000,
    status: 'Completed',
  },
  {
    id: '3',
    title: 'Wallet Top-up',
    date: '2025-07-10',
    amount: 20000,
    status: 'Success',
  },
  {
    id: '4',
    title: 'Airtime Purchase',
    date: '2025-07-09',
    amount: -1000,
    status: 'Completed',
  },
  {
    id: '5',
    title: 'Transfer from John Doe',
    date: '2025-07-08',
    amount: 5000,
    status: 'Success',
  },
  {
    id: '6',
    title: 'Online Purchase - Jumia',
    date: '2025-07-07',
    amount: -7400,
    status: 'Failed',
  },
];

export default function TransactionHistoryScreen(): JSX.Element {
  const renderItem: ListRenderItem<Transaction> = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionMeta}>
        <Text
          style={[
            styles.transactionAmount,
            { color: item.amount < 0 ? '#EF4444' : '#10B981' },
          ]}
        >
          {item.amount < 0 ? '-' : '+'}cNGN {Math.abs(item.amount).toLocaleString()}
        </Text>
        <Text
          style={[
            styles.transactionStatus,
            item.status === 'Failed' && { color: '#DC2626' },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
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
});
