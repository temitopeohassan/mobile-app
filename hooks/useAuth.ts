// /hooks/useAuth.ts
import api from './useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = async (phoneNumber: string, pin: string) => {
  const res = await api.post('/api/auth/login', {
    phoneNumber,
    pin,
  });

  const { token, user } = res.data;

  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('user', JSON.stringify(user));

  return user;
};


export const signUp = async (phoneNumber: string, pin: string) => {
  const res = await api.post('/api/auth/register', { 
    phoneNumber,
    pin,
   });
  const { token, user } = res.data;

  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const signOut = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
};
