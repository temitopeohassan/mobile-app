import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

export default function CreateCardScreen({ navigation }: any) {
  const [cardholderName, setCardholderName] = useState('');
  const [cardType, setCardType] = useState<'debit' | 'credit' | ''>('');
  const [loading, setLoading] = useState(false);

  const handleCreateCard = () => {
    if (!cardholderName || !cardType) {
      Alert.alert('Missing fields', 'Please enter all required fields.');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Card created successfully!');
      navigation.goBack(); // Return to CardsScreen
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create New Card</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Cardholder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={cardholderName}
          onChangeText={setCardholderName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Card Type</Text>
        <View style={styles.cardTypeContainer}>
          <TouchableOpacity
            style={[
              styles.cardTypeButton,
              cardType === 'debit' && styles.cardTypeButtonSelected,
            ]}
            onPress={() => setCardType('debit')}
          >
            <Text
              style={[
                styles.cardTypeText,
                cardType === 'debit' && styles.cardTypeTextSelected,
              ]}
            >
              Debit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardTypeButton,
              cardType === 'credit' && styles.cardTypeButtonSelected,
            ]}
            onPress={() => setCardType('credit')}
          >
            <Text
              style={[
                styles.cardTypeText,
                cardType === 'credit' && styles.cardTypeTextSelected,
              ]}
            >
              Credit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateCard}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.createButtonText}>Create Card</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cardTypeButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardTypeButtonSelected: {
    backgroundColor: '#4F46E5',
  },
  cardTypeText: {
    color: '#111827',
    fontWeight: '600',
  },
  cardTypeTextSelected: {
    color: '#fff',
  },
  createButton: {
    marginTop: 40,
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
