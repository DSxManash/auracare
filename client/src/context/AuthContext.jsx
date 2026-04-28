import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem('accessToken'));
  const [user, setUser] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((token, userData = null) => {
    setAccessToken(token);
    setUser(userData);
    sessionStorage.setItem('accessToken', token);
    if (userData) {
      sessionStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.removeItem('user');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Even if the request fails, we still log out on the frontend
    }
    setAccessToken(null);
    setUser(null);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
