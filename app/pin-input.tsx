import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './context/AuthContext';
import { BACK_END_API } from './constants/constants';

export default function PinInputScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { setAuth } = useAuth();
  const { phoneNumber } = route.params as { phoneNumber: string };

  const [pin, setPin] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);
  const hasTriggeredLogin = useRef(false);

  const handleLogin = useCallback(async (pinArray: string[]) => {
    const pinString = pinArray.join('');
    if (pinString.length !== 4) {
      Alert.alert('Invalid Input', 'PIN must be 4 digits.');
      return;
    }

    setIsLoading(true);
    console.log('[handleLogin] Attempting login with PIN:', pinString);

    try {
      const res = await axios.post(`${BACK_END_API}/api/auth/login`, {
        phoneNumber,
        pin: pinString,
      });

      const { token, user } = res.data;
      console.log('[handleLogin] Login successful, token:', token);

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('phoneNumber', user.phoneNumber);
      await AsyncStorage.setItem('authData', JSON.stringify({ token, phoneNumber: user.phoneNumber }));

      setAuth({ token, phoneNumber: user.phoneNumber });

      Alert.alert('Login Successful', `Welcome ${user.phoneNumber}`);

      requestAnimationFrame(() => {
        console.log('[handleLogin] Navigating to Home screen');
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }],
        });
      });
    } catch (error: any) {
      console.error('[handleLogin] Login failed:', error.message);
      Alert.alert(
        'Login Failed',
        error?.response?.data?.error || 'An error occurred. Please try again.'
      );
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
      hasTriggeredLogin.current = false;
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber, setAuth, navigation]);

  useEffect(() => {
    const pinString = pin.join('');
    console.log('[useEffect] Checking PIN completion:', pinString);

    if (pinString.length === 4 && !hasTriggeredLogin.current && !isLoading) {
      hasTriggeredLogin.current = true;
      handleLogin(pin);
    }
  }, [pin, handleLogin, isLoading]);

  const handlePinChange = (value: string, index: number) => {
    if (value !== '' && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavigateToSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter PIN</Text>
      <Text style={styles.phoneNumber}>Phone: {phoneNumber}</Text>
      <Text style={styles.subtitle}>
        {isLoading ? 'Logging in...' : 'Enter your 4-digit PIN'}
      </Text>

      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(value) => handlePinChange(value, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            keyboardType="numeric"
            maxLength={1}
            secureTextEntry
            editable={!isLoading}
            style={[
              styles.pinInput,
              {
                borderColor: digit ? '#007AFF' : '#ccc',
                backgroundColor: digit ? '#f0f8ff' : '#fff',
                opacity: isLoading ? 0.6 : 1,
              },
            ]}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleGoBack} style={styles.backButton} disabled={isLoading}>
        <Text style={styles.backButtonText}>Change phone number</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateToSignUp} style={styles.signupLink} disabled={isLoading}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  pinInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
  signupLink: {
    marginTop: 16,
  },
  signupText: {
    color: '#007AFF',
    textAlign: 'center',
  },
});
