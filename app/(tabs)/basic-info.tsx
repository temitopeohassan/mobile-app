import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BACK_END_API } from '../constants/constants';

export default function BasicInfoScreen({ navigation }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const tier = '1st';

  const getCurrentMonthYear = () => {
    const now = new Date();
    return now.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., July 2025
  };

  const memberSince = getCurrentMonthYear();

  const handleSubmit = async () => {
    if (!firstname || !lastname || !email) {
      Alert.alert('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      const token = await AsyncStorage.getItem('token');

      await axios.post(
        `${BACK_END_API}/api/user-info/${encodeURIComponent(phoneNumber)}`,
        {
          firstname,
          lastname,
          email,
          tier,
          joined: memberSince,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Profile saved successfully');
      navigation.goBack(); // or navigate to Profile
    } catch (err) {
      console.error('Failed to submit profile info:', err);
      Alert.alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Basic Information</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastname}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  hiddenFields: {
    marginBottom: 24,
  },
  hiddenText: {
    fontSize: 14,
    color: '#6B7280',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});
