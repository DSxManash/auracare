import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Users, Plus, Mail, Shield } from 'lucide-react';

const StaffManagement = () => {
  const staff = [
    { name: 'P. Sharma', role: 'Head Gardener', email: 'p.sharma@nursery.com', status: 'Active' },
    { name: 'R. Gurung', role: 'Specialist', email: 'r.gurung@nursery.com', status: 'Active' },
    { name: 'M. Karki', role: 'Maintenance', email: 'm.karki@nursery.com', status: 'Offline' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Team Management</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Facility personnel and access</p>
          </div>
          <button className="btn-primary py-2.5 px-6">
            <Plus size={20} /> Add Member
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {staff.map((person, i) => (
              <div key={i} className="card-minimal flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 group-hover:bg-emerald/10 group-hover:text-emerald transition-colors">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{person.name}</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">{person.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <Mail size={14} /> {person.email}
                   </div>
                   <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                     person.status === 'Active' ? 'bg-emerald/10 text-emerald' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                   }`}>
                     {person.status}
                   </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald/5 dark:bg-emerald/10 border border-emerald/10 dark:border-emerald/20 rounded-3xl p-8 flex flex-col items-center text-center justify-center shadow-sm">
             <div className="w-16 h-16 bg-emerald/10 text-emerald rounded-2xl flex items-center justify-center mb-6">
               <Shield size={32} />
             </div>
             <h4 className="text-xl font-bold mb-3">Access Control</h4>
             <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-medium">
                Manage system permissions and administrative levels for your nursery team.
             </p>
             <button className="w-full btn-primary py-3">
                Configure Roles
             </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffManagement;
