'use client';
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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!phoneNumber?.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber.trim().replace(/^0/, '')}`;
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('https://afrobank-backend-api-temp.vercel.app/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned invalid response format');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || data?.message || `HTTP ${response.status}: Failed to send OTP`);
      }

      navigation.replace('Otp', { phoneNumber: fullPhoneNumber });

      setTimeout(() => {
        Alert.alert('Success', `Verification code sent to ${fullPhoneNumber}`);
      }, 100);
    } catch (error) {
      let errorMessage = 'Failed to send OTP. Please try again.';

      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your internet connection.';
      } else if (error.message.includes('Network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={countryCode}
            onValueChange={(value) => setCountryCode(value)}
            style={styles.picker}
          >
            <Picker.Item label="+1 (US)" value="+1" />
            <Picker.Item label="+44 (UK)" value="+44" />
            <Picker.Item label="+234 (NG)" value="+234" />
            <Picker.Item label="+91 (IN)" value="+91" />
            <Picker.Item label="+33 (FR)" value="+33" />
          </Picker>
        </View>

        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={!loading}
          style={styles.phoneInput}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />
      ) : (
        <Button title="Send OTP" onPress={handleSubmit} />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{ marginTop: 16 }}>
        <Text style={{ color: '#2563EB', textAlign: 'center' }}>
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  pickerWrapper: {
    flex: 1.2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  phoneInput: {
    flex: 2.8,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
});
