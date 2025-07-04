import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Zap, 
  Wifi, 
  Smartphone, 
  Car, 
  Home, 
  GraduationCap,
  Heart,
  MoreHorizontal,
  Clock
} from 'lucide-react-native';

export default function BillsScreen() {
  const billCategories = [
    { id: 1, title: 'Electricity', icon: Zap, color: '#F59E0B', count: 2 },
    { id: 2, title: 'Internet', icon: Wifi, color: '#3B82F6', count: 1 },
    { id: 3, title: 'Mobile', icon: Smartphone, color: '#10B981', count: 3 },
    { id: 4, title: 'Insurance', icon: Car, color: '#EF4444', count: 2 },
    { id: 5, title: 'Rent', icon: Home, color: '#8B5CF6', count: 1 },
    { id: 6, title: 'Education', icon: GraduationCap, color: '#F97316', count: 1 },
    { id: 7, title: 'Healthcare', icon: Heart, color: '#EC4899', count: 2 },
    { id: 8, title: 'Others', icon: MoreHorizontal, color: '#6B7280', count: 5 },
  ];

  const upcomingBills = [
    { id: 1, title: 'Electricity Bill', provider: 'City Power', amount: '$89.50', dueDate: 'Due in 2 days', status: 'pending' },
    { id: 2, title: 'Internet Bill', provider: 'FastNet', amount: '$45.00', dueDate: 'Due in 5 days', status: 'pending' },
    { id: 3, title: 'Mobile Bill', provider: 'TelCorp', amount: '$32.99', dueDate: 'Due in 7 days', status: 'pending' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pay Bills</Text>
          <TouchableOpacity style={styles.historyButton}>
            <Clock size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bills or providers"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Quick Pay */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Pay</Text>
          <View style={styles.quickPayCard}>
            <Text style={styles.quickPayTitle}>Pay with QR Code</Text>
            <Text style={styles.quickPayDescription}>Scan QR code to pay bills instantly</Text>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan QR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bill Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {billCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <category.icon size={24} color={category.color} />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryCount}>{category.count} bills</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Bills */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bills</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.billsList}>
            {upcomingBills.map((bill) => (
              <TouchableOpacity key={bill.id} style={styles.billItem}>
                <View style={styles.billLeft}>
                  <View style={styles.billIcon}>
                    <Zap size={20} color="#F59E0B" />
                  </View>
                  <View style={styles.billDetails}>
                    <Text style={styles.billTitle}>{bill.title}</Text>
                    <Text style={styles.billProvider}>{bill.provider}</Text>
                    <Text style={styles.billDueDate}>{bill.dueDate}</Text>
                  </View>
                </View>
                <View style={styles.billRight}>
                  <Text style={styles.billAmount}>{bill.amount}</Text>
                  <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay</Text>
                  </TouchableOpacity>
                </View>
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
  historyButton: {
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
    marginBottom: 32,
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
  quickPayCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickPayTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  quickPayDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  scanButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
  },
  categoryItem: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  billsList: {
    paddingHorizontal: 24,
  },
  billItem: {
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
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  billIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  billDetails: {
    flex: 1,
  },
  billTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  billProvider: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  billDueDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#F59E0B',
  },
  billRight: {
    alignItems: 'flex-end',
  },
  billAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  payButton: {
    backgroundColor: '#2563EB',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  payButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});