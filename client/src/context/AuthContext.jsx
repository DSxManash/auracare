import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback((token, userData = null) => {
    setAccessToken(token);
    setUser(userData);
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
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Refresh failed');
      const data = await res.json();
      console.log('Auth Refresh Data:', data);
      setAccessToken(data.accessToken);
      setUser(data.user);
      return data.accessToken;
    } catch {
      setAccessToken(null);
      setUser(null);
      throw new Error('Session expired');
    }
  }, []);

  // Initial session check
  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAccessToken();
      } catch (err) {
        // No session or expired, which is fine for initial load
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [refreshAccessToken]);

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, refreshAccessToken, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
