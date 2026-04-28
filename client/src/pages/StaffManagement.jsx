import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { Users, Mail, Shield, Plus, MoreHorizontal, Activity, Star, UserPlus, Search } from 'lucide-react';

const staff = [
  { name: 'P. Sharma', role: 'Head Gardener', email: 'p.sharma@nursery.com', access: 'Admin', status: 'Active' },
  { name: 'K. Thapa', role: 'Senior Botanist', email: 'k.thapa@nursery.com', access: 'Editor', status: 'Active' },
  { name: 'R. Karki', role: 'Plant Technician', email: 'r.karki@nursery.com', access: 'Viewer', status: 'Active' },
  { name: 'M. Rai', role: 'Nursery Assistant', email: 'm.rai@nursery.com', access: 'Viewer', status: 'Away' },
  { name: 'S. Tamang', role: 'Climate Analyst', email: 's.tamang@nursery.com', access: 'Editor', status: 'Active' },
];

const accessBadges = {
  Admin: { label: 'Admin', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
  Editor: { label: 'Editor', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  Viewer: { label: 'Viewer', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
};

const StaffManagement = () => {
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
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Personnel</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your team and their access levels.</p>
          </div>
          <button onClick={() => showToast('Invitation sent')} className="btn-primary px-5 py-2.5">
            <UserPlus size={16} /> Add Member
          </button>
        </div>

        {/* Search & Stats Strip */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-sm">
          <div className="relative w-full md:w-80 group">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" />
            <input type="text" placeholder="Filter team members..." className="input-field py-2 pl-10 bg-slate-50 dark:bg-slate-800/50 border-transparent focus:bg-white" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{staff.filter(s => s.status === 'Active').length} Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{staff.length} Total</span>
            </div>
          </div>
        </div>

        {/* Clean Staff List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/50 overflow-hidden">
          <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {staff.map((member, idx) => (
              <motion.div 
                key={member.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                      {member.name.charAt(0)}
                    </div>
                    {member.status === 'Active' && (
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-none">{member.name}</h3>
                    <p className="text-[11px] text-slate-500 mt-1.5">{member.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-12 mt-4 sm:mt-0">
                  <div className="hidden md:flex items-center gap-2 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                    <Mail size={14} />
                    <span className="text-xs font-medium">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-3 min-w-[120px] justify-end">
                    <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest ${accessBadges[member.access].color}`}>
                      {member.access}
                    </span>
                    <button className="p-2 text-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800/50">
            End of Personnel Directory
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffManagement;
