"use client";

import { Insight } from "@/types/analytics";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, AlertTriangle, Info, XCircle, ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AISummaryCardProps {
  insights: Insight[];
}

const typeConfig = {
  positive: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50/50", border: "border-green-100", accent: "bg-green-600" },
  negative: { icon: XCircle, color: "text-th-red", bg: "bg-red-50/50", border: "border-red-100", accent: "bg-th-red" },
  alert: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50/50", border: "border-amber-100", accent: "bg-amber-600" },
  neutral: { icon: Info, color: "text-th-blue", bg: "bg-blue-50/50", border: "border-blue-100", accent: "bg-th-blue" },
};

export default function AISummaryCard({ insights }: AISummaryCardProps) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col h-full">
      <div className="p-8 pb-6 border-b border-slate-50 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 thai-gradient opacity-[0.03] rounded-full -mr-16 -mt-16" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2.5 thai-gradient rounded-xl shadow-lg shadow-blue-900/20">
            <Sparkles className="w-5 h-5 text-white fill-white/20" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 italic tracking-tighter text-xl leading-none">dee insights</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cognitive Engine v2.4</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-blue-50 text-th-blue text-[10px] font-black uppercase tracking-widest rounded-full">
          Live Analysis
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {insights.map((insight, idx) => {
          const config = typeConfig[insight.type];
          return (
            <motion.div 
              key={insight.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "p-5 rounded-[1.5rem] border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg group",
                config.bg,
                config.border
              )}
            >
              <div className="flex gap-4">
                <div className={cn("mt-1 p-2.5 rounded-xl shrink-0 shadow-sm", config.accent, "bg-opacity-10")}>
                  <config.icon className={cn("w-5 h-5", config.color)} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 tracking-tight leading-none">{insight.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{insight.description}</p>
                  
                  <div className="flex items-center gap-2 pt-1 group/btn cursor-pointer">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", config.color)}>Execute Recommendation</span>
                    <ArrowRight className={cn("w-3 h-3 transition-transform group-hover/btn:translate-x-1", config.color)} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="p-6 bg-slate-50 border-t border-slate-100">
        <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300">
          Advanced Automation Panel
        </button>
      </div>
    </div>
  );
}
