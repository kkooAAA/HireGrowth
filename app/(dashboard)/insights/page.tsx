"use client";

import { useEffect, useState } from "react";
import { fetchCampaigns } from "@/lib/analytics/fetchAdData";
import { generateInsights } from "@/lib/insights/generateInsights";
import { Insight } from "@/types/analytics";
import AISummaryCard from "@/components/dashboard/AISummaryCard";
import { motion } from "framer-motion";
import { Sparkles, Filter, BrainCircuit, Rocket, Lightbulb } from "lucide-react";

import { toast } from "sonner";

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async (isRefresh = false) => {
    if (isRefresh) {
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: 'dee AI is scanning campaign data...',
          success: 'Analysis complete! 3 new insights identified.',
          error: 'AI Engine timeout',
        }
      );
    }
    
    try {
      const res = await fetch("/api/campaigns");
      const data = await res.json();
      setInsights(generateInsights(data));
    } catch (error) {
      console.error("Error loading insights:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div className="p-8 animate-pulse bg-slate-100 rounded-[2.5rem] h-[600px]" />;

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 text-th-blue font-black uppercase tracking-[0.3em] text-[10px] mb-3">
            <div className="w-8 h-[2px] bg-th-blue" />
            AI Intelligence
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">
            dee Insights
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <button 
            onClick={() => loadData(true)}
            className="flex items-center gap-2 bg-th-blue text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <BrainCircuit className="w-5 h-5" />
            <span className="text-sm">Rerun Analysis</span>
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AISummaryCard insights={insights} />
        </div>
        
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-th-blue" />
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter mb-4">Growth Forecast</h3>
              <p className="text-slate-400 font-bold mb-8 leading-relaxed">
                Based on current trends, your account is projected to reach a <span className="text-white">4.2x ROAS</span> by the end of the quarter if the recommended optimizations are applied.
              </p>
              <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-colors">
                View Full Forecast
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-th-blue/20 rounded-full blur-3xl -mr-16 -mt-16" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/50"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="w-6 h-6 text-th-blue" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">Strategic Tip</h3>
            <p className="text-sm font-bold text-slate-500 leading-relaxed mb-6">
              Your "Tech Accessories" campaign is performing 24% better on weekend afternoons. Consider shifting 15% of your weekly budget to these time slots.
            </p>
            <div className="flex items-center gap-2 text-th-blue font-black uppercase tracking-widest text-[10px] cursor-pointer hover:underline">
              Apply Strategy <ChevronRight className="w-3 h-3" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
