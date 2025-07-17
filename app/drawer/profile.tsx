import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  Edit,
  User,
  Mail,
  Phone,
  ListPlus,
  Calendar,
  Shield,
  Bell,
  CreditCard,
  Gift,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const profileOptions = [
    { id: 1, title: 'Personal Information', icon: User, color: '#2563EB' },
    { id: 2, title: 'Security & Privacy', icon: Shield, color: '#059669' },
    { id: 3, title: 'Notifications', icon: Bell, color: '#F59E0B' },
    { id: 4, title: 'Payment Methods', icon: CreditCard, color: '#7C3AED' },
    { id: 5, title: 'Help & Support', icon: HelpCircle, color: '#0D9488' },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `https://yourapi.com/user-info/${encodeURIComponent(phoneNumber)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  const personalInfo = userData
    ? [
        { label: 'Email', value: userData.email, icon: Mail },
        { label: 'Phone', value: userData.phoneNumber, icon: Phone },
        { label: 'Tier', value: userData.tier || 'N/A', icon: ListPlus },
        { label: 'Member Since', value: userData.joined || 'N/A', icon: Calendar },
      ]
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          {loading ? (
            <ActivityIndicator size="large" color="#2563EB" />
          ) : (
            <>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{
                    uri: `../images/${userData?.image || 'profile.jpg'}`,
                  }}
                  style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editImageButton}>
                  <Edit size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.profileName}>
                {userData?.firstname} {userData?.lastname}
              </Text>
              <Text style={styles.profileEmail}>{userData?.email}</Text>
            </>
          )}
        </View>

        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoList}>
            {personalInfo.map((info, index) => (
              <View key={index} style={styles.infoItem}>
                <View style={styles.infoLeft}>
                  <View style={styles.infoIcon}>
                    <info.icon size={16} color="#6B7280" />
                  </View>
                  <View style={styles.infoDetails}>
                    <Text style={styles.infoLabel}>{info.label}</Text>
                    <Text style={styles.infoValue}>{info.value}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.optionsList}>
            {profileOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.optionItem}>
                <View style={styles.optionLeft}>
                  <View
                    style={[
                      styles.optionIcon,
                      { backgroundColor: `${option.color}20` },
                    ]}
                  >
                    <option.icon size={20} color={option.color} />
                  </View>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                </View>
                <ChevronRight size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#DC2626" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: { fontSize: 28, fontFamily: 'Inter-Bold', color: '#111827' },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 24,
  },
  section: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  infoList: { paddingHorizontal: 24 },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  infoLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoDetails: { flex: 1 },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  optionsList: { paddingHorizontal: 24 },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
  },
});