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
import { Picker } from '@react-native-picker/picker';

export default function PhoneNumberScreen() {
  const navigation = useNavigation();

  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (phoneNumber.length < 7) {
      Alert.alert('Invalid Input', 'Please enter a valid phone number.');
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/^0/, '')}`;
    
    // Navigate to PIN screen with phone number
    navigation.navigate('PinInput', { phoneNumber: fullPhoneNumber });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter your phone number</Text>

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
          autoFocus={true}
        />
      </View>

      <Button title="Continue" onPress={handleContinue} />

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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 24,
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
  signupLink: {
    marginTop: 16,
  },
  signupText: {
    color: '#007AFF',
    textAlign: 'center',
  },
});