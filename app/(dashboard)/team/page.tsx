"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Shield, MoreVertical, Search } from "lucide-react";
import { clsx } from "clsx";
import { toast } from "sonner";

const initialTeamMembers = [
  { id: 1, name: "Somchai Dee", email: "somchai@dee.com", role: "Admin", status: "active", avatar: "S" },
  { id: 2, name: "Kanya Rak", email: "kanya@dee.com", role: "Editor", status: "active", avatar: "K" },
  { id: 3, name: "Ananda Suk", email: "ananda@dee.com", role: "Viewer", status: "inactive", avatar: "A" },
  { id: 4, name: "Somsak Jai", email: "somsak@dee.com", role: "Editor", status: "active", avatar: "S" },
];

export default function TeamPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [teamMembers] = useState(initialTeamMembers);

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase()) || 
                           member.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "All Roles" || member.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter, teamMembers]);

  const handleInvite = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Preparing secure invitation...',
        success: 'Invitation link generated!',
        error: 'Failed to generate invitation',
      }
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 text-th-blue font-black uppercase tracking-[0.3em] text-[10px] mb-3">
            <div className="w-8 h-[2px] bg-th-blue" />
            Human Resources
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">
            Team Management
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <button 
            onClick={handleInvite}
            className="flex items-center gap-2 bg-th-blue text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <UserPlus className="w-5 h-5" />
            <span className="text-sm">Invite Member</span>
          </button>
        </motion.div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search team members..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-th-blue/20 transition-all outline-none text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Filter by:</span>
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 border-none rounded-lg px-4 py-2 text-xs font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option>All Roles</option>
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
                <th className="px-10 py-6">Member</th>
                <th className="px-10 py-6">Role</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/30 transition-all duration-300 group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-th-blue font-black text-lg border-2 border-white shadow-sm group-hover:bg-th-blue group-hover:text-white transition-all duration-500">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-base font-black text-slate-900 tracking-tight">{member.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        <Shield className={clsx(
                          "w-4 h-4",
                          member.role === 'Admin' ? "text-th-red" : "text-slate-400"
                        )} />
                        <span className="text-sm font-bold text-slate-700">{member.role}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className={clsx(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                        member.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                      )}>
                        <div className={clsx("w-1.5 h-1.5 rounded-full", member.status === 'active' ? "bg-green-600" : "bg-slate-400")} />
                        {member.status}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        onClick={() => toast(`Managing ${member.name}`)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center">
                    <p className="text-slate-400 font-bold italic">No team members found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
