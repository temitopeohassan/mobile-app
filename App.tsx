import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import AppNavigator from './app/AppNavigator';
import { ActivityIndicator, View, Text } from 'react-native';
import { navigationRef } from './app/navigationRef';

function AppContent() {
  const { restoreAuth, auth } = useAuth(); // Add auth here for logging
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      console.log('[AppContent] Initializing...');
      await restoreAuth();
      console.log('[AppContent] Auth restored:', auth);

      if (navigationRef.isReady()) {
        console.log('[AppContent] Navigation is ready, navigating to ReturningUserSignIn');
        navigationRef.navigate('ReturningUserSignIn');
      } else {
        console.warn('[AppContent] Navigation is not ready');
      }

      setReady(true);
    };

    init();
  }, []);

  if (!ready) {
    console.log('[AppContent] App not ready, showing loading spinner...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 20 }}>Loading App...</Text>
      </View>
    );
  }

  console.log('[AppContent] App ready, rendering AppNavigator');
  return <AppNavigator />;
}

export default function App() {
  console.log('[App] Rendering NavigationContainer...');
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef} onReady={() => console.log('[App] NavigationContainer ready')}>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}
