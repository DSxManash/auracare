import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  Activity, 
  ArrowUpRight, 
  Thermometer, 
  Droplets, 
  Sun,
  ShieldCheck,
  Zap
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  const stats = [
    { label: 'Active Plants', value: '1,284', change: '+12%', icon: Sprout },
    { label: 'System Health', value: '98.2%', change: 'Stable', icon: Activity },
    { label: 'Growth Cycle', value: 'Phase 2', change: 'On Track', icon: Zap },
  ];

  const mainMetrics = [
    { title: 'Temperature', val: '24°C', status: 'Optimal', icon: Thermometer, color: 'text-amber-500' },
    { title: 'Humidity', val: '65%', status: 'Balanced', icon: Droplets, color: 'text-blue-500' },
    { title: 'Light', val: '850lm', status: 'High', icon: Sun, color: 'text-emerald-500' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Botanical Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Good morning. Here is your facility status.</p>
          </div>
          <div className="flex gap-3">
             <button className="btn-secondary py-2 px-4">Download Report</button>
             <button className="btn-primary py-2 px-4">Manage Zones</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-minimal flex items-center justify-between group cursor-pointer hover:border-emerald dark:hover:border-emerald"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                <p className="text-3xl font-black">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-emerald">
                  <ArrowUpRight size={12} /> {stat.change}
                </div>
              </div>
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-xl flex items-center justify-center group-hover:text-emerald group-hover:bg-emerald/10 transition-all">
                <stat.icon size={24} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
           {/* Live Telemetry */}
           <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center px-2">
                 <h2 className="text-xl font-bold">Live Telemetry</h2>
                 <button className="text-xs font-bold text-emerald uppercase tracking-widest hover:underline">View All Sensors</button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                 {mainMetrics.map((m, i) => (
                   <div key={i} className="card-minimal group cursor-pointer">
                      <div className={`mb-6 ${m.color} opacity-80 group-hover:scale-110 transition-transform`}>
                         <m.icon size={32} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-1">{m.title}</h3>
                      <p className="text-2xl font-black mb-2">{m.val}</p>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald bg-emerald/10 px-2 py-0.5 rounded-md">{m.status}</span>
                   </div>
                 ))}
              </div>

              {/* Activity Card */}
              <div className="card-minimal p-0 overflow-hidden">
                 <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold">Growth Velocity</h3>
                    <div className="flex gap-2">
                       {['D', 'W', 'M', 'Y'].map(t => (
                         <button key={t} className={`w-8 h-8 rounded-lg text-[10px] font-bold flex items-center justify-center transition-colors ${t === 'W' ? 'bg-emerald text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{t}</button>
                       ))}
                    </div>
                 </div>
                 <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald/10 text-emerald rounded-full flex items-center justify-center">
                       <Activity size={32} />
                    </div>
                    <div>
                       <p className="font-bold text-lg italic tracking-tight">Intelligence Engine Active</p>
                       <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto">Sensors are communicating normally. No anomalies detected in current growth cycle.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Alerts & Tasks Side */}
           <div className="space-y-6">
              <h2 className="text-xl font-bold px-2">Facility Intelligence</h2>
              <div className="card-minimal border-emerald/20 dark:border-emerald/20 shadow-xl shadow-emerald/5">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald/10 text-emerald rounded-xl flex items-center justify-center">
                       <ShieldCheck size={20} />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">Security Status</span>
                 </div>
                 <p className="text-3xl font-black mb-2 text-slate-900 dark:text-slate-100">Stable</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6">All systems are encrypted and protected by AuraCare Sentinel.</p>
                 <button className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Run Diagnostic</button>
              </div>

              <div className="card-minimal">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Urgent Protocol</h3>
                 <div className="space-y-4">
                    {[
                      { t: "Check Soil pH", z: "Zone 4", time: "12m ago" },
                      { t: "Ventilation Calibration", z: "Zone A", time: "1h ago" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                        <div>
                          <p className="text-sm font-bold group-hover:text-emerald transition-colors">{item.t}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.z}</p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">{item.time}</span>
                      </div>
                    ))}
                 </div>
                 <button className="w-full btn-secondary mt-6 py-3">View All Protocols</button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;