import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Sprout, 
  CheckSquare, 
  Thermometer, 
  Droplets, 
  Sun, 
  FlaskConical, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  ChevronLeft
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, accessToken, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigate('/auth');
    }
  }, [navigate, accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Plants', icon: Sprout, path: '/dashboard/plants' },
    { name: 'Tasks', icon: CheckSquare, path: '/dashboard/daily-tasks' },
    { type: 'divider', label: 'Sensors' },
    { name: 'Temperature', icon: Thermometer, path: '/dashboard/temperature' },
    { name: 'Humidity', icon: Droplets, path: '/dashboard/humidity' },
    { name: 'Soil', icon: Droplets, path: '/dashboard/soil-moisture' },
    { name: 'Light', icon: Sun, path: '/dashboard/light-intensity' },
    { name: 'Nutrients', icon: FlaskConical, path: '/dashboard/nutrients' },
    { name: 'pH', icon: FlaskConical, path: '/dashboard/ph-level' },
    { type: 'divider', label: 'System' },
    { name: 'Team', icon: Users, path: '/dashboard/staff' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const isActive = (path) => location.pathname === path;
  const isSubPage = location.pathname !== '/dashboard';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-transform duration-300
        lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-20 flex items-center px-6 border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-emerald rounded-lg flex items-center justify-center">
              <Sprout className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold">AuraCare</span>
          </div>
          <button className="lg:hidden ml-auto" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
          {menuItems.map((item, i) => (
            item.type === 'divider' ? (
              <div key={i} className="pt-4 pb-1 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {item.label}
              </div>
            ) : (
              <button
                key={i}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium
                  ${isActive(item.path) ? 'bg-emerald/10 text-emerald' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}
                `}
              >
                <item.icon size={18} className={isActive(item.path) ? 'text-emerald' : 'text-slate-400 dark:text-slate-500'} />
                {item.name}
              </button>
            )
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-50 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-500" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            
            {isSubPage ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-sm font-bold text-emerald hover:opacity-80 transition-opacity"
              >
                <ChevronLeft size={18} />
                Back to Overview
              </button>
            ) : (
              <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Main Dashboard</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">{user?.name || 'User'}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
