import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  CheckCircle2, 
  Droplets, 
  Wind, 
  Scissors, 
  Shovel,
  MoreVertical,
  Calendar,
  Plus,
  Circle
} from 'lucide-react';

const PlantCareTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const tasks = [
    { id: 1, type: 'watering', icon: Droplets, title: 'Water Main Greenhouse', time: '09:00 - 11:00', priority: 'High', zone: 'Zone 4' },
    { id: 2, type: 'misting', icon: Wind, title: 'Mist Tropical Plants', time: '14:00 - 15:00', priority: 'Medium', zone: 'Zone 2' },
    { id: 3, type: 'pruning', icon: Scissors, title: 'Health Inspection', time: '17:00 - 18:00', priority: 'Low', zone: 'Zone 1' },
    { id: 4, type: 'feeding', icon: Shovel, title: 'Fertilize Banana Species', time: 'Tomorrow', priority: 'Medium', zone: 'Zone 3' },
  ];

  const toggleComplete = (id) => {
    setCompletedTasks(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Operation Tasks</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Daily maintenance & botanical care schedule</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex text-[10px] font-bold text-emerald bg-emerald/10 px-5 py-3 rounded-xl uppercase tracking-widest">
              {completedTasks.length} / {tasks.length} Completed
            </div>
            <button className="btn-primary py-3 px-6">
               <Plus size={18} /> New Task
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`card-minimal p-6 flex flex-col md:flex-row md:items-center gap-6 transition-all duration-300 relative group ${completedTasks.includes(task.id) ? 'opacity-50 grayscale' : ''}`}
            >
              {/* Status Toggle */}
              <button 
                onClick={() => toggleComplete(task.id)}
                className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                  completedTasks.includes(task.id) 
                    ? 'bg-emerald border-emerald text-white rotate-[360deg]' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-emerald dark:hover:border-emerald text-slate-300 dark:text-slate-600 hover:text-emerald dark:hover:text-emerald'
                }`}
              >
                {completedTasks.includes(task.id) ? <CheckCircle2 size={24} /> : <Circle size={24} className="opacity-20" />}
              </button>

              {/* Icon & Info */}
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${completedTasks.includes(task.id) ? 'bg-slate-100 dark:bg-slate-800' : 'bg-emerald/10 text-emerald shadow-sm group-hover:scale-110 transition-transform'}`}>
                  <task.icon size={28} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <h3 className={`font-bold text-xl transition-all duration-500 ${completedTasks.includes(task.id) ? 'line-through text-slate-400' : 'text-slate-900 dark:text-slate-100'}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3">
                       <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                         task.priority === 'High' ? 'bg-red-500/10 text-red-500' : 
                         task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald/10 text-emerald'
                       }`}>
                         {task.priority}
                       </span>
                       <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-widest">
                         {task.zone}
                       </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-emerald" /> {task.time}</span>
                    <span className="flex items-center gap-2">Protocol: SOP-{task.id}02</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 justify-end">
                <button className="text-slate-400 hover:text-emerald transition-colors p-2 rounded-xl hover:bg-emerald/10">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Card */}
        <div className="bg-emerald text-white rounded-[40px] p-10 md:p-14 relative overflow-hidden group shadow-xl shadow-emerald/20 mt-8">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 group-hover:scale-125 transition-transform duration-1000" />
           <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-sm">
                   <CheckCircle2 size={24} />
                </div>
                <h3 className="text-2xl font-black tracking-tight">Compliance & Botanical Safety</h3>
              </div>
              <p className="text-white/90 text-lg leading-relaxed font-medium mb-10">
                AuraCare ensures all maintenance routines follow strict nursery protocols. Completion logs are automatically synced with your facility's environmental audit history.
              </p>
              <div className="flex flex-wrap gap-4">
                 <button className="bg-white text-emerald px-8 py-4 rounded-xl font-bold text-sm hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-emerald/20">
                   View Full Logs
                 </button>
                 <button className="bg-emerald border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-all active:scale-95">
                   Audit Protocol
                 </button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlantCareTasks;
