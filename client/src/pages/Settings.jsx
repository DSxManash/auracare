import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Settings as SettingsIcon, Bell, Shield, Save } from 'lucide-react';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Facility Settings</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Configure system preferences</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            {[
              { label: 'General', icon: SettingsIcon, active: true },
              { label: 'Notifications', icon: Bell },
              { label: 'Security', icon: Shield },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors ${
                  item.active ? 'bg-emerald/10 text-emerald' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <item.icon size={16} /> {item.label}
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="card-minimal space-y-8">
              <h3 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4">General Configuration</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Facility Name</label>
                  <input type="text" defaultValue="Green Valley Nursery" className="input-field" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Temp Unit</label>
                    <select className="input-field appearance-none">
                      <option>Celsius (°C)</option>
                      <option>Fahrenheit (°F)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Interval</label>
                    <select className="input-field appearance-none">
                      <option>Real-time (Live)</option>
                      <option>15 Minutes</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                   <button className="btn-primary px-8">
                     <Save size={18} /> Save Settings
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
