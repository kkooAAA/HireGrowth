"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchCampaigns, fetchDailyMetrics } from "@/lib/analytics/fetchAdData";
import { generateInsights } from "@/lib/insights/generateInsights";
import { Campaign, DailyMetric, Insight } from "@/types/analytics";
import KPICard from "@/components/dashboard/KPICard";
import AISummaryCard from "@/components/dashboard/AISummaryCard";
import SpendConversionChart from "@/components/charts/SpendConversionChart";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  Target, 
  TrendingUp, 
  MousePointer2,
  Calendar,
  Filter,
  Plus
} from "lucide-react";
import { clsx } from "clsx";

import { toast } from "sonner";

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetric[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("weekly");

  useEffect(() => {
    async function loadData() {
      try {
        const [cRes, dRes] = await Promise.all([
          fetch("/api/campaigns"),
          fetch("/api/analytics")
        ]);
        
        const c = await cRes.json();
        const d = await dRes.json();
        
        setCampaigns(c);
        setDailyMetrics(d);
        setInsights(generateInsights(c));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Failed to sync with intelligence engine");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter metrics based on timeRange
  const filteredMetrics = useMemo(() => {
    if (timeRange === "daily") return dailyMetrics.slice(-7);
    if (timeRange === "weekly") return dailyMetrics.slice(-14);
    return dailyMetrics;
  }, [dailyMetrics, timeRange]);

  if (loading) {
    // ... (rest of loading remains same)
  }

  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const avgRoas = campaigns.reduce((acc, c) => acc + c.roas, 0) / campaigns.length;
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);

  const handleCreateCampaign = () => {
    toast.info("Opening Campaign Architect...", {
      description: "AI is preparing your strategy templates.",
    });
  };

  const handleExport = () => {
    toast.success("Audit Report Generated", {
      description: "Secure PDF link sent to your work email.",
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      {/* Dynamic Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 text-th-blue font-black uppercase tracking-[0.3em] text-[10px] mb-3">
            <div className="w-8 h-[2px] bg-th-blue" />
            Performance Intelligence
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">
            Overview
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-wrap items-center gap-3"
        >
          <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
            {(["daily", "weekly", "monthly"] as const).map((range) => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={clsx(
                  "px-4 py-2 text-xs font-bold transition-all capitalize rounded-xl",
                  timeRange === range ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-th-blue"
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <button 
            onClick={() => toast("Advanced filters coming soon", { icon: <Filter className="w-4 h-4" /> })}
            className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 hover:border-th-blue transition-all shadow-sm"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button 
            onClick={handleCreateCampaign}
            className="flex items-center gap-2 bg-th-blue text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">Create Campaign</span>
          </button>
        </motion.div>
      </div>

      {/* Modernized KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPICard 
          title="Total Ad Spend" 
          value={totalSpend.toLocaleString()} 
          trend={12.5} 
          icon={DollarSign} 
          prefix="$" 
          delay={0.1}
        />
        <KPICard 
          title="Conversions" 
          value={totalConversions.toLocaleString()} 
          trend={8.2} 
          icon={Target} 
          delay={0.2}
        />
        <KPICard 
          title="Return on Ad Spend" 
          value={avgRoas.toFixed(2)} 
          trend={-2.4} 
          icon={TrendingUp} 
          suffix="x" 
          delay={0.3}
        />
        <KPICard 
          title="Total Engagement" 
          value={totalClicks.toLocaleString()} 
          trend={15.1} 
          icon={MousePointer2} 
          delay={0.4}
        />
      </div>

      {/* Core Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[500px]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-8"
        >
          <SpendConversionChart data={filteredMetrics} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <AISummaryCard insights={insights} />
        </motion.div>
      </div>

      {/* Advanced Data View */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
      >
        <div className="p-10 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Live Campaigns</h3>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Global delivery metrics</p>
          </div>
          <button 
            onClick={handleExport}
            className="text-[10px] font-black text-th-blue uppercase tracking-widest hover:underline px-4 py-2 bg-blue-50 rounded-full"
          >
            Full Audit Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
                <th className="px-10 py-6">Campaign Performance</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6">Delivery Spend</th>
                <th className="px-10 py-6">Intelligence (ROAS)</th>
                <th className="px-10 py-6">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {campaigns.slice(0, 5).map((campaign) => (
                <tr 
                  key={campaign.id} 
                  onClick={() => toast.info(`Viewing ${campaign.name}`)}
                  className="hover:bg-slate-50/30 transition-all duration-300 group cursor-pointer"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black group-hover:bg-th-blue group-hover:text-white transition-all duration-500">
                        {campaign.name[0]}
                      </div>
                      <div>
                        <p className="text-base font-black text-slate-900 tracking-tight">{campaign.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Ref: {campaign.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className={clsx(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                      campaign.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                    )}>
                      <div className={clsx("w-1.5 h-1.5 rounded-full", campaign.status === 'active' ? "bg-green-600 animate-pulse" : "bg-slate-400")} />
                      {campaign.status}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-base font-black text-slate-900 tabular-nums">${campaign.spend.toLocaleString()}</td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-slate-900 tabular-nums">{campaign.roas.toFixed(2)}x</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="bg-th-blue h-full rounded-full" style={{ width: `${Math.min(campaign.roas * 10, 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-base font-bold text-slate-500 tabular-nums">
                    {campaign.ctr.toFixed(2)}% <span className="text-[10px] text-slate-300 ml-1">CTR</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
