import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthData = {
  phoneNumber: string;
  token: string;
};

type AuthContextType = {
  auth: AuthData;
  setAuth: (auth: AuthData) => void;
  restoreAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

const defaultAuth: AuthData = {
  phoneNumber: '',
  token: '',
};

const AuthContext = createContext<AuthContextType>({
  auth: defaultAuth,
  setAuth: () => {},
  restoreAuth: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// ✅ Replaces jwt-decode
const parseJwt = (token: string) => {
  try {
    const base64 = token.split('.')[1];
    const decodedPayload = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodedPayload);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuthState] = useState<AuthData>(defaultAuth);

  const setAuth = (authData: AuthData) => {
    setAuthState(authData);
    AsyncStorage.setItem('authData', JSON.stringify(authData));
    AsyncStorage.setItem('lastPhoneNumber', authData.phoneNumber);
  };

  const restoreAuth = async () => {
    try {
      const stored = await AsyncStorage.getItem('authData');
      if (stored) {
        const parsed: AuthData = JSON.parse(stored);

        const decoded = parseJwt(parsed.token);
        const now = Date.now() / 1000;

        if (decoded?.exp && decoded.exp < now) {
          await AsyncStorage.removeItem('authData');
          return;
        }

        setAuthState(parsed);
      }
    } catch (error) {
      console.error('Failed to restore auth from storage:', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authData');
    await AsyncStorage.removeItem('lastPhoneNumber');
    setAuthState(defaultAuth);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, restoreAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
