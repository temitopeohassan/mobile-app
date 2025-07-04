import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { signIn } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = async () => {
    try {
      const user = await signIn(phoneNumber, pin);
      Alert.alert('Welcome', `Hello ${user.name}`);
      navigation.replace('Home'); // 👈 This must match the `name` in App.tsx Stack.Screen
    } catch (err: any) {
      console.error(err);
      Alert.alert('Login Failed', err.response?.data?.message || 'An error occurred');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // 👈 This must match a registered screen name
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign In</Text>

      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={{ marginBottom: 12, borderWidth: 1, padding: 8 }}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TextInput
        placeholder="PIN"
        secureTextEntry
        keyboardType="numeric"
        maxLength={4}
        style={{ marginBottom: 12, borderWidth: 1, padding: 8 }}
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
