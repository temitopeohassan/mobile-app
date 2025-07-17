import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'https://afrobank-api.vercel.app/api';

const BasicInfoScreen = () => {
  const { auth } = useAuth();
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [bvn, setBvn] = useState('');

  useEffect(() => {
    if (auth.phoneNumber) {
      console.log('Fetching info for:', auth.phoneNumber);
      fetchUserInfo(auth.phoneNumber);
    }
  }, [auth.phoneNumber]);

  const fetchUserInfo = async (phoneNumber: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/user-info/${phoneNumber}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const data = response.data;
      setFullName(data.fullName || '');
      setDob(data.dob || '');
      setBvn(data.bvn || '');
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const submitProfileInfo = async () => {
    if (!auth.phoneNumber) {
      Alert.alert('Error', 'Phone number missing from context.');
      return;
    }

    const profileData = {
      fullName,
      dob,
      bvn,
    };

    try {
      await axios.post(`${BASE_URL}/user-info/${auth.phoneNumber}`, profileData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      Alert.alert('Success', 'Profile information updated!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile information.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
      />

      <TextInput
        style={styles.input}
        placeholder="BVN"
        value={bvn}
        onChangeText={setBvn}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={submitProfileInfo}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BasicInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2e86de',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
