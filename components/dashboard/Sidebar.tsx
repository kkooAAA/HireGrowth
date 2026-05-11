"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  Lightbulb, 
  FileText, 
  Users, 
  Settings,
  TrendingUp,
  Zap,
  ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "dee Insights", href: "/insights", icon: Lightbulb },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 h-full relative z-40">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 thai-gradient rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
          <Zap className="text-white w-6 h-6 fill-white" />
        </div>
        <div>
          <span className="text-xl font-black text-slate-900 italic tracking-tighter block leading-none">dee</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Insights Engine</span>
        </div>
      </div>
      
      <nav className="flex-1 mt-4 px-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-th-blue text-white shadow-xl shadow-blue-900/10" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-th-blue"
                )} />
                <span className="font-bold text-sm tracking-tight">{item.name}</span>
              </div>
              {isActive && (
                <motion.div layoutId="active-pill">
                  <ChevronRight className="w-4 h-4 text-white/50" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="p-5 bg-slate-900 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-th-blue/20 rounded-full blur-2xl -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Enterprise API</p>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            
            <p className="text-white font-bold text-sm mb-4">Usage Limits</p>
            
            <div className="space-y-3">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  className="bg-th-red h-full rounded-full" 
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-400">Tokens</span>
                <span className="text-white">750k / 1M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
