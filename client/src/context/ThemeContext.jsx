import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('auracare-theme');
    return saved === 'dark';
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('auracare-accent') || 'emerald';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('auracare-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('auracare-theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const root = document.documentElement;
    // Remove previous accent classes
    root.classList.forEach(cls => {
      if (cls.startsWith('accent-')) root.classList.remove(cls);
    });
    root.classList.add(`accent-${accentColor}`);
    localStorage.setItem('auracare-accent', accentColor);
  }, [accentColor]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export default ThemeContext;
