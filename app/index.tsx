import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import bannerPic from '../assets/images/afrobank-header.fw.png';
import { useAuth } from './context/AuthContext';

export default function SplashScreen(): JSX.Element {
  const navigation = useNavigation<any>();
  const { setAuth } = useAuth();

  const parseJwt = (token: string) => {
    try {
      const base64 = token.split('.')[1];
      const decoded = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadAuthAndNavigate = async () => {
      try {
        const stored = await AsyncStorage.getItem('authData');
        if (stored) {
          const parsed = JSON.parse(stored);
          const decoded = parseJwt(parsed.token);
          const now = Date.now() / 1000;

          if (decoded?.exp && decoded.exp > now) {
            setAuth(parsed);
            return navigation.replace('MainApp'); // User is authenticated
          } else {
            await AsyncStorage.removeItem('authData');
          }
        }

        navigation.replace('SignIn'); // User not authenticated
      } catch (error) {
        console.error('SplashScreen error:', error);
        navigation.replace('SignIn');
      }
    };

    const timer = setTimeout(loadAuthAndNavigate, 2000); // 2-second splash delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image source={bannerPic} style={styles.bannerImage} />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Secure • Fast • Reliable</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  bannerImage: {
    width: 300,
    height: 80,
    borderRadius: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#000000',
    textAlign: 'center',
  },
});
