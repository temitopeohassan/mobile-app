import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function CompleteRegisterScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { phoneNumber, userId } = route.params as {
    phoneNumber: string;
    userId?: string;
  };

  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const validatePin = () => {
    if (pin.length < 4 || pin.length > 8) {
      Alert.alert('Invalid PIN', 'PIN must be between 4 and 8 digits.');
      return false;
    }
    if (pin !== confirmPin) {
      Alert.alert('PIN Mismatch', 'PIN and Confirm PIN do not match.');
      return false;
    }
    if (/^(\d)\1+$/.test(pin)) {
      Alert.alert('Weak PIN', 'Avoid repeated digits like 1111.');
      return false;
    }
    if (/^(0123|1234|2345|3456|4567|5678|6789|7890|9876|8765|7654|6543|5432|4321|3210)/.test(pin)) {
      Alert.alert('Weak PIN', 'Avoid sequential digits like 1234.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validatePin()) return;

    setLoading(true);
    try {
      const response = await fetch('https://afrobank-backend-api.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          pin,
          userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Your account has been created!', [
          {
            text: 'Continue',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              }),
          },
        ]);
      } else {
        Alert.alert('Registration Failed', data.message || data.error || 'Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Network Error', 'Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith('+234')) {
      return phone.replace(/(\+234)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
    }
    if (phone.startsWith('+1')) {
      return phone.replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
    }
    return phone;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Registration</Text>
          <Text style={styles.subtitle}>Set up a secure PIN for your account</Text>
        </View>

        <View style={styles.form}>
          {/* Read-only Phone Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, styles.readOnlyInput]}
              value={formatPhoneNumber(phoneNumber)}
              editable={false}
              selectTextOnFocus={false}
            />
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#4CAF50"
              style={styles.verifiedIcon}
            />
          </View>

          {/* PIN Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Create PIN (4–8 digits)</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter PIN"
                keyboardType="numeric"
                secureTextEntry={!showPin}
                maxLength={8}
                value={pin}
                onChangeText={setPin}
              />
              <TouchableOpacity
                onPress={() => setShowPin(!showPin)}
                style={styles.eyeIcon}
              >
                <Ionicons name={showPin ? 'eye-off' : 'eye'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm PIN */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm PIN</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Confirm PIN"
                keyboardType="numeric"
                secureTextEntry={!showConfirmPin}
                maxLength={8}
                value={confirmPin}
                onChangeText={setConfirmPin}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPin(!showConfirmPin)}
                style={styles.eyeIcon}
              >
                <Ionicons name={showConfirmPin ? 'eye-off' : 'eye'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#2196F3" />
            ) : (
              <Button title="Complete Registration" onPress={handleSubmit} />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
  verifiedIcon: {
    position: 'absolute',
    right: 12,
    top: 36,
  },
  buttonContainer: {
    marginTop: 8,
  },
});
