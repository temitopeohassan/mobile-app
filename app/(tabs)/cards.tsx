import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CardsScreen() {
  const cardNumber = '1234567812345678'; // Example card number
  const maskedCardNumber = `${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(-4)}`;
  const navigation = useNavigation();

    const handleCreateCard = () => {
    navigation.navigate('CreateCards');
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
    <View style={styles.header}>
      <Text style={styles.title}>My Cards</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateCard}
      >
        <Text style={styles.createButtonText}>+ Create Card</Text>
      </TouchableOpacity>
    </View>


      {/* Card Display */}
      <View style={styles.card}>
        <Text style={styles.cardNumber}>{maskedCardNumber}</Text>
        <Text style={styles.cardLabel}>Virtual Card</Text>
      </View>

      {/* Sections */}
      <ScrollView style={styles.sections}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Details</Text>
          <Text style={styles.sectionContent}>Name: John Doe{'\n'}Expiry: 12/26</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <Text style={styles.sectionContent}>Recent activity will appear here</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Freeze / Block Card</Text>
          <TouchableOpacity style={styles.blockButton}>
            <Text style={styles.blockButtonText}>Freeze Card</Text>
          </TouchableOpacity>
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
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  createButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 2,
  },
  cardLabel: {
    color: '#cbd5e1',
    marginTop: 10,
    fontSize: 14,
  },
  sections: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#4B5563',
  },
  blockButton: {
    marginTop: 10,
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    borderRadius: 8,
  },
  blockButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
