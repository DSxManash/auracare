import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Thermometer, Droplets, Sun, FlaskConical,
  CheckSquare, Sprout, ArrowUpRight, ShieldCheck, Zap, Activity,
  Users, Settings as SettingsIcon
} from 'lucide-react';

const sensorCards = [
  { label: 'Temperature', value: '24°C', status: 'Optimal', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', icon: Thermometer, path: '/dashboard/temperature', statusColor: 'badge-green' },
  { label: 'Humidity', value: '65%', status: 'Optimal', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: Droplets, path: '/dashboard/humidity', statusColor: 'badge-green' },
  { label: 'Soil Moisture', value: '42%', status: 'Warning', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', icon: Droplets, path: '/dashboard/soil-moisture', statusColor: 'badge-yellow' },
  { label: 'Light Intensity', value: '820 lux', status: 'Optimal', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', icon: Sun, path: '/dashboard/light-intensity', statusColor: 'badge-green' },
  { label: 'Nutrients (EC)', value: '1.8 mS', status: 'Optimal', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', icon: FlaskConical, path: '/dashboard/nutrients', statusColor: 'badge-green' },
  { label: 'pH Level', value: '6.2', status: 'Critical', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', icon: FlaskConical, path: '/dashboard/ph-level', statusColor: 'badge-red' },
];

const summaryStats = [
  { label: 'Total Plants', value: '248', icon: Sprout, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { label: 'Active Sensors', value: '6', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Tasks Today', value: '12', icon: CheckSquare, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { label: 'System Health', value: '98%', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <DashboardLayout>
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        className="space-y-8 max-w-5xl"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">System Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time intelligence from your nursery ecosystem</p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryStats.map((s) => (
            <div key={s.label} className="card relative overflow-hidden group">
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                  <s.icon size={22} className={s.color} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{s.value}</div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{s.label}</div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-slate-100 dark:to-slate-800/50 -mr-12 -mt-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>

        {/* Sensor Grid */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Environmental Monitoring</h2>
            <span className="flex items-center gap-2 text-[10px] text-accent uppercase tracking-widest font-bold bg-accent/5 px-2.5 py-1 rounded-full border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span> Live Stream
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sensorCards.map((card) => (
              <motion.button
                key={card.label}
                whileHover={{ y: -5 }}
                onClick={() => navigate(card.path)}
                className="card text-left relative overflow-hidden group border-slate-200/60 dark:border-slate-800"
              >
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center shadow-lg shadow-black/5`}>
                    <card.icon size={18} className={card.color} />
                  </div>
                  <ArrowUpRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-accent transition-colors" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{card.value}</div>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</span>
                  <span className={`${card.statusColor} text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider`}>{card.status}</span>
                </div>
                {/* Accent Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          {/* Alerts */}
          <div className="card border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-amber-500" />
                <h3 className="font-bold text-slate-800 dark:text-slate-200">System Alerts</h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Recent 24h</span>
            </div>
            <div className="space-y-4">
              {[
                { type: 'Critical', message: 'pH Level below 6.0 in Zone 3', time: '5 min ago', color: 'badge-red' },
                { type: 'Warning', message: 'Soil moisture dropping in Zone 1', time: '22 min ago', color: 'badge-yellow' },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 hover:border-accent/20 transition-colors group">
                  <span className={`${alert.color} text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 mt-0.5`}>{alert.type}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{alert.message}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card border-l-4 border-l-accent">
            <div className="flex items-center gap-2 mb-5">
              <Activity size={16} className="text-accent" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Fast Navigation</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Daily Tasks', path: '/dashboard/daily-tasks', icon: CheckSquare },
                { label: 'Inventory', path: '/dashboard/plants', icon: Sprout },
                { label: 'Staff', path: '/dashboard/staff', icon: Users },
                { label: 'Settings', path: '/dashboard/settings', icon: SettingsIcon },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.path)}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 hover:border-accent hover:bg-accent/5 group transition-all"
                >
                  <a.icon size={20} className="text-slate-400 group-hover:text-accent transition-colors" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-accent">{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;