import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((token, userData = null) => {
    setAccessToken(token);
    setUser(userData);
    // No localStorage! Token lives only in React state (lost on refresh)
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      // Even if the request fails, we still log out on the frontend
    }
    setAccessToken(null);
    setUser(null);
    // Navigation will be handled by the component using this hook
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Refresh failed');
      const data = await res.json();
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      setAccessToken(null);
      throw new Error('Session expired');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
