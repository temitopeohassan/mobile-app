import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { BACK_END_API } from './constants/constants';

export default function OtpScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { phoneNumber } = route.params as { phoneNumber: string };

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'OTP must be 6 digits.');
      return;
    }

    setLoading(true);
    console.log('Verifying OTP:', otp, 'for phone number:', phoneNumber);

    try {
      const response = await fetch(
        '${BACK_END_API}/api/auth/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            phoneNumber,
            code: otp,
          }),
        }
      );

      const data = await response.json();
      console.log('Verify OTP response:', data);

      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Failed to verify OTP');
      }

      // Option 1: Navigate immediately without Alert
      navigation.replace('CompleteRegister', {
        phoneNumber,
        verificationSid: data.sid, // optional, if needed
      });

      // Option 2: If you want to keep the Alert, use this instead:
      /*
      Alert.alert('Verified', 'Phone number verified successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Add a small delay to ensure Alert closes before navigation
            setTimeout(() => {
              navigation.replace('CompleteRegister', {
                phoneNumber,
                verificationSid: data.sid,
              });
            }, 100);
          },
        },
      ]);
      */
    } catch (error: any) {
      console.error('OTP verification failed:', error);

      let message = 'Failed to verify OTP.';
      if (error.message?.includes('expired')) {
        message = 'The OTP has expired. Please request a new one.';
      } else if (error.message?.includes('incorrect')) {
        message = 'Incorrect OTP. Please try again.';
      } else if (error.message) {
        message = error.message;
      }

      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    Alert.alert('Resend OTP', 'Would you like to go back and request a new OTP?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We've sent a code to {phoneNumber}</Text>

      <TextInput
        placeholder="6-digit OTP"
        keyboardType="numeric"
        maxLength={6}
        style={styles.otpInput}
        value={otp}
        onChangeText={setOtp}
        editable={!loading}
        autoFocus
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
          <View style={styles.buttonSpacing} />
          <Button title="Resend OTP" onPress={handleResendOTP} color="#666" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    color: '#666',
  },
  otpInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 3,
  },
  buttonContainer: {
    gap: 8,
  },
  buttonSpacing: {
    height: 8,
  },
  loader: {
    marginTop: 16,
  },
});