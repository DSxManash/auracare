import React from 'react';
import DashboardLayout from './DashboardLayout';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, ShieldCheck, ArrowLeft, History, Info, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getStatus = (val, min, max, optimalMin, optimalMax) => {
  if (val < min || val > max) return { label: 'Critical', color: 'red' };
  if (val < optimalMin || val > optimalMax) return { label: 'Warning', color: 'yellow' };
  return { label: 'Optimal', color: 'green' };
};

const MetricPage = ({
  title,
  icon: Icon,
  currentVal,
  unit,
  minVal,
  maxVal,
  optimalMin,
  optimalMax,
  history = [],
  description = '',
}) => {
  const navigate = useNavigate();
  const status = getStatus(currentVal, minVal, maxVal, optimalMin, optimalMax);
  const pct = Math.max(0, Math.min(100, ((currentVal - minVal) / (maxVal - minVal)) * 100));

  const statusColors = {
    green: {
      bg: 'bg-accent-light',
      text: 'text-accent',
      bar: 'bg-accent',
      badge: 'bg-accent-light text-accent border-accent/20',
      icon: ShieldCheck,
      glow: 'shadow-accent/20',
    },
    yellow: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'text-amber-700 dark:text-amber-400',
      bar: 'bg-amber-400',
      badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-500/20',
      icon: AlertTriangle,
      glow: 'shadow-amber-500/10',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-400',
      bar: 'bg-red-500',
      badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-500/20',
      icon: AlertTriangle,
      glow: 'shadow-red-500/10',
    },
  };

  const c = statusColors[status.color];
  const StatusIcon = c.icon;

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:border-accent transition-colors">
              <ArrowLeft size={14} />
            </div>
            Overview
          </button>
          <button 
            onClick={() => navigate('/dashboard/settings?tab=alerts')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors uppercase tracking-widest"
          >
            <SettingsIcon size={14} /> Thresholds
          </button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center shadow-xl ${c.glow}`}>
              <Icon size={28} className={c.text} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${c.badge}`}>
                  <StatusIcon size={12} /> {status.label}
                </span>
                <span className="text-xs text-slate-400 font-medium">Zone 3 • Indoor Nursery</span>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="card py-3 px-5 flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Peak 24h</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{maxVal}{unit}</span>
            </div>
            <div className="card py-3 px-5 flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Min 24h</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{minVal}{unit}</span>
            </div>
          </div>
        </div>

        {/* Hero Data Card */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-8 relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Reading</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">
                      {currentVal}
                    </span>
                    <span className="text-2xl font-bold text-slate-400">{unit}</span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <TrendingUp size={20} className="text-accent" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">Optimal Range</span>
                  <span className="text-xs font-bold text-accent">{optimalMin} – {optimalMax}{unit}</span>
                </div>
                <div className="relative h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1">
                  {/* Optimal Zone Overlay */}
                  <div 
                    className="absolute h-full bg-accent/10 dark:bg-accent/20 z-0 transition-all"
                    style={{ 
                      left: `${((optimalMin - minVal) / (maxVal - minVal)) * 100}%`,
                      width: `${((optimalMax - optimalMin) / (maxVal - minVal)) * 100}%`
                    }}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className={`h-full rounded-full relative z-10 shadow-lg ${c.bar}`}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
                  <span>SYSTEM MIN: {minVal}{unit}</span>
                  <span>SYSTEM MAX: {maxVal}{unit}</span>
                </div>
              </div>
            </div>
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 ${c.bg} rounded-full blur-[80px] -mr-32 -mt-32 opacity-30`} />
          </div>

          {/* AI Assessment Card */}
          <div className={`card p-6 border-transparent ${c.bg} flex flex-col justify-between relative overflow-hidden`}>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Info size={16} className={c.text} />
                <h3 className={`font-bold text-sm ${c.text} uppercase tracking-wider`}>Assessment</h3>
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                {status.label === 'Optimal' 
                  ? 'Your plants are thriving in these conditions.' 
                  : 'Action recommended to restore optimal growth balance.'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {description || `The current level of ${currentVal}${unit} is ${status.label.toLowerCase()} for the nursery ecosystem.`}
              </p>
            </div>
            <div className="relative z-10 pt-6">
              <button onClick={() => navigate('/dashboard/daily-tasks')} className="btn-primary w-full py-2.5 text-xs">
                View Recommendations
              </button>
            </div>
            <ShieldCheck size={120} className={`absolute -bottom-8 -right-8 ${c.text} opacity-5`} />
          </div>
        </div>

        {/* History Table */}
        <div className="card p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400">
                <History size={16} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">24-Hour Logs</h3>
            </div>
            <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">Download CSV</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.length > 0 ? (
              history.map((entry, i) => {
                const s = getStatus(entry.value, minVal, maxVal, optimalMin, optimalMax);
                const color = statusColors[s.color];
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-slate-400 w-20">{entry.time}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${color.bar}`} />
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{entry.value}{unit}</span>
                      </div>
                    </div>
                    <span className={`badge text-[10px] uppercase font-bold tracking-tighter ${color.badge}`}>
                      {s.label}
                    </span>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-12 text-center text-sm text-slate-400">No logs available for this period.</div>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default MetricPage;
