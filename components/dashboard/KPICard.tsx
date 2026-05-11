"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KPICardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: LucideIcon;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

export default function KPICard({ title, value, trend, icon: Icon, suffix, prefix, delay = 0 }: KPICardProps) {
  const isPositive = trend >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-th-blue group-hover:text-white transition-all duration-300 shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <div className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black tracking-tight",
            isPositive ? "text-green-600 bg-green-50" : "text-th-red bg-red-50"
          )}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-0.5">{title}</p>
          <div className="flex items-baseline gap-1">
            {prefix && <span className="text-xl font-bold text-slate-300">{prefix}</span>}
            <span className="text-3xl font-black text-slate-900 tracking-tighter tabular-nums">{value}</span>
            {suffix && <span className="text-sm font-bold text-slate-400 ml-1">{suffix}</span>}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400">vs. last month</span>
          <div className="flex -space-x-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-4 h-4 rounded-full border-2 border-white bg-slate-200" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
