import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const MetricPage = ({ title, icon: Icon, currentVal, unit, minVal, maxVal, optimalMin, optimalMax, assessment, trend, alertLevel }) => {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald/10 text-emerald rounded-2xl flex items-center justify-center shadow-sm">
              <Icon size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">{title}</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Real-time telemetry analysis</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Live Connection Active</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Reading */}
          <div className="lg:col-span-2 card-minimal flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 opacity-5 text-emerald group-hover:scale-110 transition-transform duration-700 pointer-events-none">
               <Icon size={300} />
            </div>
            <div className="relative z-10 flex justify-between items-start mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Current Reading</span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald/10 text-emerald rounded-lg text-[10px] font-bold uppercase tracking-widest">
                <TrendingUp size={14} /> {trend}
              </div>
            </div>
            
            <div className="relative z-10 flex items-baseline gap-3 mb-16">
              <span className="text-7xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-slate-100">{currentVal}</span>
              <span className="text-3xl font-bold text-slate-400 dark:text-slate-500">{unit}</span>
            </div>

            <div className="relative z-10 space-y-4">
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  <span>Range Analysis</span>
                  <span>{minVal}{unit} — {maxVal}{unit}</span>
               </div>
               <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentVal/maxVal)*100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald to-teal-400"
                  />
               </div>
            </div>
          </div>

          {/* Assessment Card */}
          <div className="card-minimal border-emerald/20 dark:border-emerald/20 shadow-xl shadow-emerald/5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none text-emerald">
               <ShieldCheck size={100} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-emerald/10 text-emerald rounded-lg flex items-center justify-center">
                  <Info size={16} />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Health Assessment</h3>
              </div>
              <p className="text-2xl font-black leading-tight text-slate-900 dark:text-slate-100">{assessment}</p>
            </div>
            <div className="relative z-10 mt-12 pt-6 border-t border-slate-100 dark:border-slate-800">
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                  <span>Optimal Zone target</span>
               </div>
               <p className="text-xl font-bold text-emerald">{optimalMin}{unit} to {optimalMax}{unit}</p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8">
           <div className="card-minimal flex items-center gap-6 group hover:border-amber-500/50 transition-colors cursor-default">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                 <AlertTriangle size={28} />
              </div>
              <div>
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Alert Thresholds</p>
                 <p className="font-bold text-slate-900 dark:text-slate-100 text-lg">{alertLevel}</p>
              </div>
           </div>
           <div className="card-minimal flex items-center gap-6 group hover:border-emerald/50 transition-colors cursor-default">
              <div className="w-14 h-14 bg-emerald/10 text-emerald rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                 <ShieldCheck size={28} />
              </div>
              <div>
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Calibration Status</p>
                 <p className="font-bold text-emerald text-lg">Verified Stable</p>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MetricPage;
