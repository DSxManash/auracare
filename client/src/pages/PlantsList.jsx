import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { Sprout, Search, Plus, ChevronRight, Filter, MoreHorizontal, Leaf, Activity, AlertCircle, ShieldCheck } from 'lucide-react';

const plants = [
  { name: 'Snake Plant', species: 'Sansevieria trifasciata', zone: 'Zone A', health: 'Optimal', age: '3 yrs', qty: 12 },
  { name: 'Fiddle Leaf Fig', species: 'Ficus lyrata', zone: 'Zone B', health: 'Warning', age: '2 yrs', qty: 5 },
  { name: 'Peace Lily', species: 'Spathiphyllum wallisii', zone: 'Zone A', health: 'Optimal', age: '1 yr', qty: 20 },
  { name: 'Monstera', species: 'Monstera deliciosa', zone: 'Zone C', health: 'Optimal', age: '4 yrs', qty: 8 },
  { name: 'Bird of Paradise', species: 'Strelitzia reginae', zone: 'Zone B', health: 'Critical', age: '5 yrs', qty: 3 },
  { name: 'Pothos', species: 'Epipremnum aureum', zone: 'Zone D', health: 'Optimal', age: '1 yr', qty: 35 },
  { name: 'ZZ Plant', species: 'Zamioculcas zamiifolia', zone: 'Zone A', health: 'Optimal', age: '2 yrs', qty: 14 },
];

const healthConfig = {
  Optimal: {
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    icon: ShieldCheck,
    label: 'Healthy'
  },
  Warning: {
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    icon: Activity,
    label: 'Monitor'
  },
  Critical: {
    color: 'text-red-500 bg-red-500/10 border-red-500/20',
    icon: AlertCircle,
    label: 'Critical'
  },
};

const PlantsList = () => {
  const showToast = (msg) => {
    const toast = document.getElementById('global-toast');
    if (toast) {
      toast.innerText = msg;
      toast.classList.add('toast-visible');
      setTimeout(() => toast.classList.remove('toast-visible'), 3000);
    }
  };

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Plant Inventory</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track your collection across all nursery zones</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary px-4 py-2.5 text-xs">
              <Filter size={14} /> Filter
            </button>
            <button onClick={() => showToast('Adding plant...')} className="btn-primary px-6 py-2.5">
              <Plus size={16} /> Add New Plant
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search by name, species or zone..."
            className="input-field pl-12 bg-white/70 dark:bg-slate-800/40 backdrop-blur-md border-slate-200/60 dark:border-white/5 shadow-sm"
          />
        </div>

        {/* Table/List View */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
          <div className="hidden md:grid grid-cols-12 border-b border-slate-100 dark:border-slate-800 px-8 py-5 bg-slate-50/50 dark:bg-slate-800/30">
            <span className="col-span-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Species Identification</span>
            <span className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Nursery Zone</span>
            <span className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Development</span>
            <span className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Health Status</span>
            <span className="col-span-1"></span>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {plants.map((p, idx) => {
              const h = healthConfig[p.health];
              const StatusIcon = h.icon;
              return (
                <motion.div 
                  key={p.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-12 items-center px-8 py-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all group relative"
                >
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center shrink-0 border border-accent/10 group-hover:scale-110 transition-transform">
                      <Leaf size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-accent transition-colors">{p.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-0.5">{p.species}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex col-span-2 flex-col items-center">
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                      {p.zone}
                    </span>
                  </div>

                  <div className="hidden md:flex col-span-2 flex-col items-center">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{p.age}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Batch Qty: {p.qty}</p>
                  </div>

                  <div className="col-span-2 flex justify-center mt-4 md:mt-0">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${h.color} transition-all group-hover:shadow-lg group-hover:shadow-current/5`}>
                      <StatusIcon size={14} className="shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{h.label}</span>
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-end gap-2 mt-4 md:mt-0">
                    <button className="p-2 rounded-xl text-slate-300 dark:text-slate-600 hover:text-accent hover:bg-accent/5 transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                    <button className="p-2 rounded-xl text-slate-300 dark:text-slate-600 hover:text-accent hover:bg-accent/5 transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="px-8 py-4 bg-slate-50/30 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">End of results</span>
            <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">View Archived</button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PlantsList;
