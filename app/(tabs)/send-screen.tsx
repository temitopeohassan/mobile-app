import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SendScreen(): JSX.Element {
  const [receiver, setReceiver] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleSend = (): void => {
    if (!receiver || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // TODO: Replace with actual transaction logic
    Alert.alert('Success', `Sent ${amount} tokens to ${receiver}`);
    setReceiver('');
    setAmount('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Send Tokens</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Receiver Address</Text>
        <TextInput
          style={styles.input}
          value={receiver}
          onChangeText={setReceiver}
          placeholder="0x..."
          autoCapitalize="none"
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {},
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: '#1D4ED8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});
