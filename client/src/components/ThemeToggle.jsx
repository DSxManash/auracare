import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300
        hover:bg-slate-50 dark:hover:bg-slate-700
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
      aria-label="Toggle theme"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun size={16} className="text-amber-400" />
      ) : (
        <Moon size={16} className="text-slate-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
