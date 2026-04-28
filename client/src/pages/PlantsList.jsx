import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Sprout, Search, Plus, ChevronRight, Filter } from 'lucide-react';

const PlantsList = () => {
  const plants = [
    { name: 'Snake Plant', species: 'Sansevieria', room: 'Zone 3', status: 'Healthy', moisture: '42%' },
    { name: 'Peace Lily', species: 'Spathiphyllum', room: 'Zone 1', status: 'Warning', moisture: '30%' },
    { name: 'Rubber Fig', species: 'Ficus elastica', room: 'Terrace', status: 'Urgent', moisture: '18%' },
    { name: 'Spider Plant', species: 'Chlorophytum', room: 'Dining', status: 'Healthy', moisture: '55%' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Plant Inventory</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Managing {plants.length} active species</p>
          </div>
          <button className="btn-primary py-3 px-6">
            <Plus size={20} /> <span className="hidden sm:inline">Register New Plant</span>
          </button>
        </div>

        <div className="card-minimal p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 max-w-md relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald transition-colors" />
              <input 
                type="text" 
                placeholder="Search inventory, zones, or status..." 
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald/20 focus:border-emerald outline-none transition-all text-sm font-medium text-slate-900 dark:text-slate-100" 
              />
            </div>
            <button className="btn-secondary py-2.5 px-6 text-sm">
              <Filter size={16} /> Filters
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Botanical Info</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Zone</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Moisture</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center">Health Status</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {plants.map((plant, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald shadow-sm group-hover:scale-110 transition-transform">
                          <Sprout size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100 leading-none mb-1.5">{plant.name}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 italic font-medium">{plant.species}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{plant.room}</td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                             <div className={`h-full ${parseInt(plant.moisture) < 30 ? 'bg-red-500' : 'bg-emerald'}`} style={{ width: plant.moisture }} />
                          </div>
                          <span className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400">{plant.moisture}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                          plant.status === 'Healthy' ? 'bg-emerald/10 text-emerald' : 
                          plant.status === 'Warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {plant.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <ChevronRight size={20} className="text-slate-300 dark:text-slate-600 group-hover:text-emerald group-hover:translate-x-1 transition-all" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlantsList;
