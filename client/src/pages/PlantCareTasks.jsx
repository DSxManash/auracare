import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Droplets, Wind, Scissors, Shovel, Calendar, Plus, Clock, Filter, Check, Trash2, ArrowRight } from 'lucide-react';

const iconMap = {
  Watering: Droplets,
  Misting: Wind,
  Pruning: Scissors,
  Feeding: Shovel,
};

const priorityConfig = {
  High: {
    color: 'text-red-500 bg-red-500/10 border-red-500/20',
    dot: 'bg-red-500',
    label: 'Urgent'
  },
  Medium: {
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    dot: 'bg-amber-500',
    label: 'Priority'
  },
  Low: {
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    dot: 'bg-blue-500',
    label: 'Routine'
  },
};

const initialTasks = [
  { id: 1, title: 'Water succulent collection', type: 'Watering', zone: 'Zone A', priority: 'High', due: '9:00 AM', done: false },
  { id: 2, title: 'Mist tropical ferns', type: 'Misting', zone: 'Zone B', priority: 'Medium', due: '10:30 AM', done: false },
  { id: 3, title: 'Prune rose bushes', type: 'Pruning', zone: 'Zone C', priority: 'Low', due: '12:00 PM', done: false },
  { id: 4, title: 'Fertilize herb garden', type: 'Feeding', zone: 'Zone A', priority: 'High', due: '2:00 PM', done: false },
  { id: 5, title: 'Deep water orchids', type: 'Watering', zone: 'Zone D', priority: 'Medium', due: '3:30 PM', done: true },
  { id: 6, title: 'Mist cactus row', type: 'Misting', zone: 'Zone E', priority: 'Low', due: '5:00 PM', done: false },
];

const PlantCareTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');

  const toggle = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const filtered = filter === 'all' ? tasks : filter === 'pending' ? tasks.filter(t => !t.done) : tasks.filter(t => t.done);
  const pending = tasks.filter(t => !t.done).length;
  const completed = tasks.filter(t => t.done).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Daily Maintenance</h1>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AuraCare Automations</span>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">{pending} Pending Actions</span>
            </div>
          </div>
          <button onClick={() => {}} className="btn-primary px-6 py-3 shadow-accent/20">
            <Plus size={18} /> Schedule Task
          </button>
        </div>

        {/* Global Progress Card */}
        <div className="card relative overflow-hidden group border-accent/20 bg-gradient-to-br from-white to-accent/[0.02] dark:from-slate-900 dark:to-accent/[0.05]">
          <div className="relative z-10 flex items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nursery Completion Score</span>
                <span className="text-2xl font-black text-accent tracking-tighter">{progress}%</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="h-full bg-accent rounded-full shadow-lg shadow-accent/20"
                />
              </div>
              <p className="text-[11px] text-slate-400 font-medium italic">
                “Consistency is the key to a thriving nursery ecosystem.”
              </p>
            </div>
            <div className="hidden sm:flex w-24 h-24 items-center justify-center rounded-[2rem] bg-accent/5 border border-accent/10">
              <CheckCircle2 size={40} className="text-accent opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2">
          <div className="flex p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            {['all', 'pending', 'done'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  filter === f
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-colors">
            <Filter size={12} /> Sort by Priority
          </button>
        </div>

        {/* Task Grid */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center card bg-transparent border-dashed"
              >
                <Clock size={40} className="mx-auto text-slate-200 mb-4" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">All caught up for today!</p>
              </motion.div>
            ) : (
              filtered.map((task, idx) => {
                const Icon = iconMap[task.type] || Droplets;
                const p = priorityConfig[task.priority];
                return (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`card group hover:shadow-xl hover:shadow-accent/5 transition-all p-4 ${task.done ? 'opacity-50' : 'border-transparent hover:border-accent/10'}`}
                  >
                    <div className="flex items-center gap-5">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggle(task.id)}
                        className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all ${
                          task.done 
                            ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
                            : 'border-slate-200 dark:border-slate-700 hover:border-accent group-hover:scale-105'
                        }`}
                      >
                        {task.done ? <Check size={18} strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-accent/40" />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className={`text-base font-bold tracking-tight truncate ${task.done ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                            {task.title}
                          </h3>
                          <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider ${p.color}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                            {p.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5">
                            <Icon size={12} className="text-accent" /> {task.type}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} /> {task.due}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <ArrowRight size={12} /> {task.zone}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 rounded-xl text-slate-300 hover:text-accent hover:bg-accent/5 transition-all">
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PlantCareTasks;
