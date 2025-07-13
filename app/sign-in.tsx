import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from './context/AuthContext'; // 👈 import the context

export default function SignInScreen() {
  const navigation = useNavigation();
  const { setAuth } = useAuth(); // 👈 use context to store token and phoneNumber

  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = async () => {
    if (phoneNumber.length < 7 || pin.length !== 4) {
      Alert.alert('Invalid Input', 'Enter a valid phone number and a 4-digit PIN.');
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/^0/, '')}`;

    try {
      const res = await axios.post('https://afrobank-backend-api.vercel.app/api/auth/login', {
        phoneNumber: fullPhoneNumber,
        pin,
      });

      const { token, user } = res.data;

      // ✅ Set auth data globally
      setAuth({ phoneNumber: user.phoneNumber, token });

      Alert.alert('Login Successful', `Welcome ${user.phoneNumber}`);

      // ✅ Navigate to main app
      navigation.replace('Home'); // no need to pass params anymore
    } catch (error: any) {
      console.error('Login failed:', error.message);
      Alert.alert(
        'Login Failed',
        error?.response?.data?.error || 'An error occurred. Please try again.'
      );
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={{ padding: 24, flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Sign In</Text>

      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <View style={{ flex: 1.2, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
          <Picker
            selectedValue={countryCode}
            onValueChange={(value) => setCountryCode(value)}
            style={{ height: 50 }}
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
          style={{
            flex: 2.8,
            marginLeft: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
          }}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TextInput
        placeholder="PIN"
        secureTextEntry
        keyboardType="numeric"
        maxLength={4}
        style={{
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 12,
        }}
        value={pin}
        onChangeText={setPin}
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={handleSignUp} style={{ marginTop: 16 }}>
        <Text style={{ color: '#007AFF', textAlign: 'center' }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
