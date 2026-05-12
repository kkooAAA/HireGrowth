"use client";

import { motion } from "framer-motion";
import { User, Bell, Lock, Globe, CreditCard, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  const sections = [
    {
      title: "Account Profile",
      description: "Manage your personal information and preferences",
      icon: User,
      items: ["Personal Information", "Email Preferences", "Profile Visibility"]
    },
    {
      title: "Notifications",
      description: "Control how you receive alerts and updates",
      icon: Bell,
      items: ["Email Notifications", "Push Notifications", "Slack Integration"]
    },
    {
      title: "Security",
      description: "Protect your account with advanced security features",
      icon: Lock,
      items: ["Password", "Two-Factor Authentication", "Login History"]
    },
    {
      title: "Billing",
      description: "Manage your subscription and payment methods",
      icon: CreditCard,
      items: ["Plan Overview", "Payment Methods", "Invoices"]
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2 text-th-blue font-black uppercase tracking-[0.3em] text-[10px] mb-3">
          <div className="w-8 h-[2px] bg-th-blue" />
          System Configuration
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">
          Settings
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group"
          >
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl text-th-blue group-hover:bg-th-blue group-hover:text-white transition-all duration-500">
                <section.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{section.title}</h3>
                <p className="text-sm font-bold text-slate-400 mt-1">{section.description}</p>
              </div>
            </div>

            <div className="space-y-2">
              {section.items.map((item) => (
                <button 
                  key={item}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors text-left group/item"
                >
                  <span className="text-sm font-bold text-slate-600 group-hover/item:text-th-blue transition-colors">{item}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover/item:text-th-blue transition-transform group-hover/item:translate-x-1" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black italic tracking-tighter mb-2">Need Enterprise Assistance?</h3>
            <p className="text-slate-400 font-bold max-w-md">Our dedicated account managers are available 24/7 for custom integration support and strategic advice.</p>
          </div>
          <button className="px-8 py-4 bg-th-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all">
            Contact Support
          </button>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-th-blue/10 skew-x-12 -mr-20" />
      </motion.div>
    </div>
  );
}
