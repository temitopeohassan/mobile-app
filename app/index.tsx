import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Wallet } from 'lucide-react-native';

export default function SplashScreen() {
    const navigation = useNavigation();


    useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignIn'); // 👈 Matches Stack.Screen name
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Wallet size={64} color="#000000" strokeWidth={1.5} />
        </View>
        <Text style={styles.title}>AfroBank</Text>
        <Text style={styles.subtitle}>Your Blockchain Wallet</Text>
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
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
    textAlign: 'center',
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