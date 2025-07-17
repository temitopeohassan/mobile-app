import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from './context/AuthContext';
import { BACK_END_API } from './constants/constants';

export default function SignInScreen() {
  const navigation = useNavigation();
  const { setAuth } = useAuth();

  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (phoneNumber.length < 7 || pin.length !== 4) {
      Alert.alert('Invalid Input', 'Enter a valid phone number and a 4-digit PIN.');
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/^0/, '')}`;

    try {
      setLoading(true);
      const res = await axios.post(`${BACK_END_API}/api/auth/login`, {
        phoneNumber: fullPhoneNumber,
        pin,
      });

      const { token, user } = res.data;

      // ✅ Store in AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('phoneNumber', user.phoneNumber);

      // ✅ Optional combined object (if needed later)
      await AsyncStorage.setItem('authData', JSON.stringify({ token, phoneNumber: user.phoneNumber }));

      // ✅ Set auth context
      setAuth({ token, phoneNumber: user.phoneNumber });

      Alert.alert('Login Successful', `Welcome ${user.phoneNumber}`);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed:', error.message);
      Alert.alert(
        'Login Failed',
        error?.response?.data?.error || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={countryCode}
            onValueChange={setCountryCode}
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
          maxLength={11}
          style={styles.phoneInput}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TextInput
        placeholder="PIN"
        secureTextEntry
        keyboardType="numeric"
        maxLength={4}
        style={styles.input}
        value={pin}
        onChangeText={setPin}
      />

      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signupLink}>
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
    marginBottom: 24,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1.2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  phoneInput: {
    flex: 2.8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  signupLink: {
    marginTop: 16,
  },
  signupText: {
    color: '#007AFF',
    textAlign: 'center',
  },
});
