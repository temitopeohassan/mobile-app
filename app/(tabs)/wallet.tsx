import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  CreditCard, 
  Plus, 
  Send, 
  Download, 
  MoreHorizontal,
  Smartphone,
  Banknote,
  Building2
} from 'lucide-react-native';

export default function WalletScreen() {
  const cards = [
    { id: 1, type: 'Main Card', number: '•••• •••• •••• 1234', balance: '$12,547.80', color: ['#2563EB', '#1D4ED8'] },
    { id: 2, type: 'Savings Card', number: '•••• •••• •••• 5678', balance: '$8,240.50', color: ['#059669', '#047857'] },
  ];

  const walletOptions = [
    { id: 1, title: 'Link Bank Account', icon: Building2, description: 'Connect your bank account' },
    { id: 2, title: 'Add Debit Card', icon: CreditCard, description: 'Add a new payment method' },
    { id: 3, title: 'Mobile Money', icon: Smartphone, description: 'Connect mobile wallet' },
    { id: 4, title: 'Cash Pickup', icon: Banknote, description: 'Find pickup locations' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Wallet</Text>
          <TouchableOpacity style={styles.moreButton}>
            <MoreHorizontal size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
          style={styles.cardsScroll}
        >
          {cards.map((card) => (
            <LinearGradient
              key={card.id}
              colors={card.color}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardType}>{card.type}</Text>
                <CreditCard size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.cardNumber}>{card.number}</Text>
              <Text style={styles.cardBalance}>{card.balance}</Text>
            </LinearGradient>
          ))}
          
          {/* Add Card */}
          <TouchableOpacity style={styles.addCard}>
            <Plus size={32} color="#6B7280" />
            <Text style={styles.addCardText}>Add Card</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#2563EB' }]}>
                <Send size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#059669' }]}>
                <Download size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Receive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#DC2626' }]}>
                <Plus size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Wallet Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wallet Options</Text>
          <View style={styles.optionsList}>
            {walletOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.optionItem}>
                <View style={styles.optionLeft}>
                  <View style={styles.optionIcon}>
                    <option.icon size={24} color="#2563EB" />
                  </View>
                  <View style={styles.optionDetails}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                </View>
                <MoreHorizontal size={20} color="#6B7280" />
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
  moreButton: {
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
  cardsScroll: {
    marginBottom: 32,
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  card: {
    width: 300,
    height: 180,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cardNumber: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  cardBalance: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  addCard: {
    width: 300,
    height: 180,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  addCardText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginTop: 8,
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
  optionsList: {
    paddingHorizontal: 24,
  },
  optionItem: {
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
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});