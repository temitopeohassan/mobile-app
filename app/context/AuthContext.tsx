import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthData = {
  phoneNumber: string;
  token: string;
};

type AuthContextType = {
  auth: AuthData;
  setAuth: (auth: AuthData) => void;
};

const defaultAuth: AuthData = {
  phoneNumber: '',
  token: '',
};

const AuthContext = createContext<AuthContextType>({
  auth: defaultAuth,
  setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthData>(defaultAuth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
