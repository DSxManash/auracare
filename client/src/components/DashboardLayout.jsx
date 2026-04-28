import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Sprout, Thermometer, Droplets, Sun, FlaskConical,
  CheckSquare, Users, Settings as SettingsIcon, LogOut, Menu, X,
  Bell, ChevronLeft, Leaf, User, Shield, Palette, ChevronDown, 
  ChevronRight, PanelLeftClose, PanelLeft, Wind, Gauge, Lightbulb, Activity
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const workspaceItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Inventory', icon: Sprout, path: '/dashboard/plants' },
  { label: 'Daily Tasks', icon: CheckSquare, path: '/dashboard/daily-tasks' },
];

const monitoringGroups = [
  {
    title: 'Climate',
    items: [
      { label: 'Temperature', icon: Thermometer, path: '/dashboard/temperature' },
      { label: 'Humidity', icon: Wind, path: '/dashboard/humidity' },
    ]
  },
  {
    title: 'Resources',
    items: [
      { label: 'Soil Moisture', icon: Droplets, path: '/dashboard/soil-moisture' },
      { label: 'Nutrients', icon: Activity, path: '/dashboard/nutrients' },
    ]
  },
  {
    title: 'Environment',
    items: [
      { label: 'pH Level', icon: FlaskConical, path: '/dashboard/ph-level' },
      { label: 'Light Intensity', icon: Lightbulb, path: '/dashboard/light-intensity' },
    ]
  }
];

const adminItems = [
  { label: 'Staff Management', icon: Users, path: '/dashboard/staff' },
  { label: 'System Settings', icon: SettingsIcon, path: '/dashboard/settings' },
];

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const initials = (() => {
    const nameToUse = user?.name || user?.email || 'User';
    const parts = nameToUse.split(/[ @._]/).filter(Boolean);
    if (parts.length === 0) return 'U';
    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase() || first.toUpperCase();
  })();
  const menuRef = useRef(null);

  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavLink = ({ item }) => {
    const active = location.pathname === item.path;
    return (
      <button
        onClick={() => navigate(item.path)}
        className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all relative group ${
          active 
            ? 'bg-accent text-white shadow-lg shadow-accent/20' 
            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <item.icon size={18} className="shrink-0" />
        {!isCollapsed && <span className="truncate">{item.label}</span>}
        {isCollapsed && (
          <div className="absolute left-14 px-2 py-1 bg-slate-900 text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-xl">
            {item.label}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-[#fafafa] dark:bg-[#050505] text-slate-900 dark:text-slate-100 font-sans antialiased overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        className="hidden lg:flex flex-col bg-white dark:bg-[#0a0a0a] border-r border-slate-100 dark:border-white/5 z-40 relative group/sidebar"
      >
        {/* Header/Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-white/5 overflow-hidden">
          <div className="flex items-center gap-3 min-w-max">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
              <Leaf size={16} className="text-white" />
            </div>
            {!isCollapsed && <span className="font-bold text-base tracking-tight whitespace-nowrap">AuraCare</span>}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {/* Workspace */}
          <div>
            {!isCollapsed && <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Workspace</p>}
            <div className="space-y-1">
              {workspaceItems.map(item => <NavLink key={item.path} item={item} />)}
            </div>
          </div>

          {/* Monitoring Sections */}
          {monitoringGroups.map(group => (
            <div key={group.title}>
              {!isCollapsed && <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">{group.title}</p>}
              <div className="space-y-1">
                {group.items.map(item => <NavLink key={item.path} item={item} />)}
              </div>
            </div>
          ))}

          {/* Admin */}
          <div>
            {!isCollapsed && <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Admin</p>}
            <div className="space-y-1">
              {adminItems.map(item => <NavLink key={item.path} item={item} />)}
            </div>
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-2">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            {isCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            {!isCollapsed && <span>Collapse</span>}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-[#0a0a0a] z-50 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <Leaf size={16} className="text-white" />
                  </div>
                  <span className="font-bold text-lg">AuraCare</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 space-y-8 overflow-y-auto pr-2">
                {/* Same nav structure for mobile */}
                <div className="space-y-1">
                  {workspaceItems.map(item => <NavLink key={item.path} item={item} />)}
                </div>
                {monitoringGroups.map(group => (
                  <div key={group.title} className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{group.title}</p>
                    <div className="space-y-1">
                      {group.items.map(item => <NavLink key={item.path} item={item} />)}
                    </div>
                  </div>
                ))}
                <div className="space-y-1">
                  {adminItems.map(item => <NavLink key={item.path} item={item} />)}
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#0a0a0a] border-b border-slate-100 dark:border-white/5 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl">
              <Menu size={20} />
            </button>
            {location.pathname !== '/dashboard' && (
              <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-accent transition-colors uppercase tracking-[0.15em]">
                <ChevronLeft size={14} /> Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-2" />
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-2.5 p-1 rounded-2xl border transition-all duration-300 ${
                  profileOpen 
                    ? 'border-accent bg-accent/5 shadow-lg shadow-accent/5' 
                    : 'border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-8 h-8 rounded-[0.9rem] bg-accent text-white flex items-center justify-center text-xs font-black shadow-lg shadow-accent/20">{initials}</div>
                <div className="hidden sm:block text-left pr-2">
                  <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider leading-none">{user?.name?.split(' ')[0] || 'User'}</p>
                  <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500 mt-1 leading-none">Settings</p>
                </div>
                <ChevronDown size={12} className={`text-slate-400 mr-1 transition-transform duration-500 ${profileOpen ? 'rotate-180 text-accent' : ''}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#111] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden py-1.5"
                  >
                    <div className="px-4 py-3.5 border-b border-slate-100 dark:border-white/5 flex items-center gap-3 mb-1.5">
                      <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center text-sm font-bold">{initials}</div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.name || 'User'}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{user?.email || 'Authenticated'}</p>
                      </div>
                    </div>
                    <div className="px-1.5 space-y-0.5">
                      {[
                        { label: 'Profile Settings', icon: User, path: '/dashboard/settings?tab=general' },
                        { label: 'Display Theme', icon: Palette, path: '/dashboard/settings?tab=appearance' },
                        { label: 'Security Center', icon: Shield, path: '/dashboard/settings?tab=security' },
                      ].map(i => (
                        <button 
                          key={i.label}
                          onClick={() => { navigate(i.path); setProfileOpen(false); }}
                          className="flex items-center justify-between w-full p-2.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-accent rounded-xl transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <i.icon size={14} className="opacity-70" />
                            {i.label}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mx-1.5 mt-1.5 pt-1.5 border-t border-slate-100 dark:border-white/5">
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full p-2.5 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                        <LogOut size={14} /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-12 relative bg-[#fafafa] dark:bg-[#050505]">
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
      
      <div id="global-toast" className="toast shadow-2xl pointer-events-none" />
    </div>
  );
};

export default DashboardLayout;
