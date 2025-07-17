import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from './context/AuthContext';
import { BACK_END_API } from './constants/constants';

export default function ReturningUserSignInScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { setAuth } = useAuth();
  const { phoneNumber } = route.params as { phoneNumber: string };

  const [pin, setPin] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  const handleLogin = async (pinArray: string[]) => {
    if (isLoading || hasLoggedIn) return;

    const pinString = pinArray.join('');
    if (pinString.length !== 4) {
      Alert.alert('Invalid Input', 'PIN must be 4 digits.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post('${BACK_END_API}/api/auth/login', {
        phoneNumber,
        pin: pinString,
      });

      const { token } = res.data;

      await AsyncStorage.setItem('authData', JSON.stringify({ token, phoneNumber }));
      await AsyncStorage.setItem('lastPhoneNumber', phoneNumber);
      setAuth({ phoneNumber, token });

      setHasLoggedIn(true); // Prevent multiple logins
      Alert.alert('Login Successful', 'Welcome back!');
      navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});
    } catch (error: any) {
      console.error('Returning login failed:', error.message);
      Alert.alert(
        'Login Failed',
        error?.response?.data?.error || 'An error occurred. Please try again.'
      );
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-submit when PIN is complete
  useEffect(() => {
    if (pin.join('').length === 4 && !isLoading && !hasLoggedIn) {
      handleLogin(pin);
    }
  }, [pin, isLoading, hasLoggedIn]);

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

  return (
    <View style={{ padding: 24, flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Welcome Back</Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>Phone Number: {phoneNumber}</Text>
      <Text style={{ fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
        {isLoading ? 'Logging in...' : 'Enter your 4-digit PIN'}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, paddingHorizontal: 20 }}>
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
            style={{
              width: 60,
              height: 60,
              borderWidth: 2,
              borderColor: digit ? '#007AFF' : '#ccc',
              borderRadius: 12,
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              backgroundColor: digit ? '#f0f8ff' : '#fff',
              opacity: isLoading ? 0.6 : 1,
            }}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{ marginTop: 16 }}>
        <Text style={{ color: '#007AFF', textAlign: 'center' }}>
          Sign in as a different user
        </Text>
      </TouchableOpacity>
    </View>
  );
}
