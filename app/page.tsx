"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-th-blue/5 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-th-blue mb-8 shadow-sm"
        >
          <Zap className="w-3 h-3 fill-th-blue" />
          Next-Gen Ads Intelligence
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl md:text-8xl font-black text-slate-900 italic tracking-tighter text-center leading-[0.9]"
        >
          dee <br /><span className="text-th-blue">insights</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-xl text-slate-500 font-bold max-w-xl text-center leading-relaxed"
        >
          Transform your advertising spend into measurable growth with our AI-powered performance engine.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link 
            href="/dashboard"
            className="group flex items-center gap-2 px-8 py-4 bg-th-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all"
          >
            Launch Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
            View Live Demo
          </button>
        </motion.div>

        {/* Floating Cards Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24 w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: BarChart3, label: "Real-time Analytics", color: "bg-blue-50 text-th-blue" },
            { icon: Shield, label: "Enterprise Security", color: "bg-red-50 text-th-red" },
            { icon: Zap, label: "AI Optimization", color: "bg-amber-50 text-amber-600" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">{item.label}</h3>
              <p className="mt-2 text-sm font-bold text-slate-400">Automated insights that drive actual business value.</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-slate-100">
        <div className="h-full bg-th-blue w-1/3" />
        <div className="absolute top-0 left-1/3 h-full bg-white w-1/3" />
        <div className="absolute top-0 left-2/3 h-full bg-th-red w-1/3" />
      </div>
    </main>
  );
}
