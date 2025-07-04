import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { signUp } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');

  const handleSignUp = async () => {
    if (phoneNumber.length !== 11 || pin.length !== 4) {
      Alert.alert('Invalid Input', 'Phone number must be 11 digits and PIN must be 4 digits.');
      return;
    }

    try {
      const user = await signUp(phoneNumber, pin);
      Alert.alert('Account Created', `Welcome ${user.name}`);
      navigation.replace('Home'); // 👈 Make sure this matches your Stack.Screen name
    } catch (err: any) {
      console.error(err);
      Alert.alert('Sign Up Failed', err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Create Account</Text>

      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        maxLength={15}
        style={{ marginBottom: 12, borderWidth: 1, padding: 8 }}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TextInput
        placeholder="Choose a 4-digit PIN"
        secureTextEntry
        keyboardType="numeric"
        maxLength={4}
        style={{ marginBottom: 12, borderWidth: 1, padding: 8 }}
        value={pin}
        onChangeText={setPin}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}
