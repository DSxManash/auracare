import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:text-emerald dark:hover:text-emerald transition-all active:scale-90 relative overflow-hidden group shadow-sm border border-transparent dark:border-slate-700"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ y: isDarkMode ? 40 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Sun size={20} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ y: isDarkMode ? 0 : -40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute top-2.5"
      >
        <Moon size={20} />
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
