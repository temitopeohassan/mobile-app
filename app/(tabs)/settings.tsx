import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bell, 
  Shield, 
  Eye, 
  Smartphone, 
  Globe, 
  Palette, 
  HelpCircle, 
  FileText, 
  MessageSquare,
  ChevronRight,
  Moon,
  Lock,
  Fingerprint
} from 'lucide-react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsGroups = [
    {
      title: 'Security & Privacy',
      items: [
        { 
          id: 1, 
          title: 'Biometric Authentication', 
          icon: Fingerprint, 
          color: '#059669',
          hasToggle: true,
          toggleValue: biometricAuth,
          onToggle: setBiometricAuth
        },
        { id: 2, title: 'Change Password', icon: Lock, color: '#2563EB' },
        { id: 3, title: 'Privacy Settings', icon: Eye, color: '#7C3AED' },
        { id: 4, title: 'Two-Factor Authentication', icon: Shield, color: '#DC2626' },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { 
          id: 5, 
          title: 'Push Notifications', 
          icon: Bell, 
          color: '#F59E0B',
          hasToggle: true,
          toggleValue: pushNotifications,
          onToggle: setPushNotifications
        },
        { 
          id: 6, 
          title: 'Email Notifications', 
          icon: Bell, 
          color: '#0D9488',
          hasToggle: true,
          toggleValue: emailNotifications,
          onToggle: setEmailNotifications
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { 
          id: 7, 
          title: 'Dark Mode', 
          icon: Moon, 
          color: '#4B5563',
          hasToggle: true,
          toggleValue: darkMode,
          onToggle: setDarkMode
        },
        { id: 8, title: 'Language', icon: Globe, color: '#2563EB', subtitle: 'English' },
        { id: 9, title: 'Theme', icon: Palette, color: '#EC4899', subtitle: 'Default' },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 10, title: 'Help Center', icon: HelpCircle, color: '#059669' },
        { id: 11, title: 'Contact Support', icon: MessageSquare, color: '#F59E0B' },
        { id: 12, title: 'Terms of Service', icon: FileText, color: '#6B7280' },
        { id: 13, title: 'Privacy Policy', icon: FileText, color: '#6B7280' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupItems}>
              {group.items.map((item) => (
                <TouchableOpacity key={item.id} style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, { backgroundColor: `${item.color}20` }]}>
                      <item.icon size={20} color={item.color} />
                    </View>
                    <View style={styles.settingDetails}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      {item.subtitle && (
                        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.settingRight}>
                    {item.hasToggle ? (
                      <Switch
                        value={item.toggleValue}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                        thumbColor={item.toggleValue ? '#FFFFFF' : '#F3F4F6'}
                      />
                    ) : (
                      <ChevronRight size={20} color="#6B7280" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.appVersion}>
          <Text style={styles.versionText}>FinanceFlow v1.0.0</Text>
          <Text style={styles.versionSubtext}>© 2024 FinanceFlow. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  settingsGroup: {
    marginBottom: 32,
  },
  groupTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    paddingHorizontal: 24,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupItems: {
    paddingHorizontal: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingDetails: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  settingRight: {
    marginLeft: 12,
  },
  appVersion: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});