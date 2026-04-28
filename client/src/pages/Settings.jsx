import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useTheme } from '../context/ThemeContext';
import { 
  Shield, Check, Eye, EyeOff, User, Palette, Lock, Camera
} from 'lucide-react';

const PasswordInput = ({ label, placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>}
      <div className="relative group">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder || '••••••••'}
          value={value}
          onChange={onChange}
          className="input-field pr-10 text-sm h-11 px-4 bg-white dark:bg-white/5 border-slate-200/50"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-emerald-500 transition-colors"
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
};

const Settings = () => {
  const { isDarkMode, toggleTheme, accentColor, setAccentColor } = useTheme();
  const { user, accessToken, login: updateAuthUser } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [facilityName, setFacilityName] = useState('Green Valley Nursery');

  const initials = (() => {
    const nameToUse = name || user?.name || user?.email || 'User';
    const parts = nameToUse.split(/[ @._]/).filter(Boolean);
    if (parts.length === 0) return 'U';
    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase() || first.toUpperCase();
  })();

  const showToast = (msg) => {
    const toast = document.getElementById('global-toast');
    if (toast) {
      toast.innerText = msg;
      toast.className = 'toast toast-visible';
      setTimeout(() => toast.className = 'toast', 3000);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) return showToast('Please fill all fields');
    if (newPassword.length < 8) return showToast('Password must be at least 8 characters');
    if (newPassword !== confirmPassword) return showToast('Passwords do not match');
    setLoading(true);
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update');
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
      showToast('Password updated');
    } catch (err) { showToast(err.message); } finally { setLoading(false); }
  };

  const handleProfileUpdate = async () => {
    if (!name) return showToast('Name is required');
    setLoading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify({ name, facilityName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update');
      showToast('Profile updated');
      if (data.user) updateAuthUser(accessToken, { ...user, name: data.user.name });
    } catch (err) { showToast(err.message); } finally { setLoading(false); }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto pb-20 px-4 md:px-0">
        {/* Simplified Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
          <p className="text-[12px] text-slate-500 font-medium">Manage your nursery identity and secure your access.</p>
        </div>

        <div className="space-y-6">
          {/* Section: Profile */}
          <div className="bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-white/5 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-white/5 pb-4">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <User size={12} />
              </div>
              <h2 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Profile Identity</h2>
            </div>

            <div className="flex items-center gap-8 mb-10">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/5 flex items-center justify-center text-3xl font-black text-emerald-500 border border-emerald-500/10 shrink-0">
                {initials}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <button className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-4 py-2 rounded-lg border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors">Update</button>
                  <button className="text-[9px] font-black text-red-500/60 uppercase tracking-widest hover:text-red-500 transition-colors">Remove</button>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-tight max-w-[200px]">Update your public avatar for the staff directory.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="input-field h-11 text-sm px-4" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Facility</label>
                <input value={facilityName} onChange={(e) => setFacilityName(e.target.value)} placeholder="Facility Name" className="input-field h-11 text-sm px-4" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Email</label>
                <div className="relative">
                  <input value={user?.email || 'N/A'} disabled className="input-field h-11 text-sm px-4 opacity-40 bg-slate-50 dark:bg-black/20 cursor-not-allowed border-dashed" />
                  <Lock size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={handleProfileUpdate} disabled={loading} className="btn-primary h-11 w-full sm:w-44 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/10 transition-all active:scale-95">Save Changes</button>
            </div>
          </div>

          {/* Section: Security */}
          <div className="bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-white/5 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-white/5 pb-4">
              <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Shield size={12} />
              </div>
              <h2 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Security Access</h2>
            </div>
            
            <div className="space-y-5 max-w-sm">
              <PasswordInput label="Current Key" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              <div className="h-px bg-slate-100 dark:bg-white/5" />
              <PasswordInput label="New Key" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <PasswordInput label="Confirm Key" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={handlePasswordChange} disabled={loading} className="btn-primary h-11 w-full sm:w-44 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/10 transition-all active:scale-95">Update Password</button>
            </div>
          </div>

          {/* Section: Appearance */}
          <div className="bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-white/5 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-white/5 pb-4">
              <div className="w-6 h-6 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Palette size={12} />
              </div>
              <h2 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Visual Theme</h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <p className="text-[11px] text-slate-400 font-medium">Switch between light and dark modes.</p>
              <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200/50 dark:border-white/5">
                <button 
                  onClick={() => isDarkMode && toggleTheme()} 
                  className={`px-8 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${!isDarkMode ? 'bg-white dark:bg-white/10 text-emerald-500 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  Solar
                </button>
                <button 
                  onClick={() => !isDarkMode && toggleTheme()} 
                  className={`px-8 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white dark:bg-white/10 text-emerald-500 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  Lunar
                </button>
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-white/5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Accent Highlight</label>
              <div className="flex flex-wrap gap-4 pt-2">
                {['emerald', 'blue', 'indigo', 'purple', 'rose'].map(color => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`w-9 h-9 rounded-xl transition-all ${accentColor === color ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 scale-105 shadow-md' : 'hover:scale-105 opacity-60 hover:opacity-100'}`}
                    style={{ backgroundColor: color === 'emerald' ? '#10b981' : color === 'blue' ? '#3b82f6' : color === 'indigo' ? '#6366f1' : color === 'purple' ? '#a855f7' : '#f43f5e' }}
                  >
                    {accentColor === color && <Check size={14} className="text-white mx-auto" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
