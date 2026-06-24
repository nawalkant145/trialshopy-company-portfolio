import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('trialshopy-admin');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (adminData, token) => {
    const payload = { ...adminData, token };
    setAdmin(payload);
    localStorage.setItem('trialshopy-admin', JSON.stringify(payload));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('trialshopy-admin');
  };

  const isAuthenticated = !!admin?.token;

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
