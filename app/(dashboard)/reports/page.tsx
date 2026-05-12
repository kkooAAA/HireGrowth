"use client";

import { useEffect, useState, useMemo } from "react";
import { Campaign } from "@/types/analytics";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { clsx } from "clsx";
import { toast } from "sonner";

export default function ReportsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/campaigns");
        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error loading reports:", error);
        toast.error("Failed to load campaign records");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.includes(search)
    );
  }, [campaigns, search]);

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const paginatedCampaigns = filteredCampaigns.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleDownload = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Compiling audit logs...',
        success: 'Report downloaded successfully',
        error: 'Export failed',
      }
    );
  };

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
            Full Audit Logs
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">
            Campaign Reports
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download className="w-5 h-5" />
            <span className="text-sm">Download Report</span>
          </button>
        </motion.div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-th-blue/20 transition-all outline-none text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => toast("Advanced reporting filters active")}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
                <th className="px-10 py-6">Campaign</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6">Spend</th>
                <th className="px-10 py-6">Conversions</th>
                <th className="px-10 py-6">ROAS</th>
                <th className="px-10 py-6">CTR</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedCampaigns.length > 0 ? (
                paginatedCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50/30 transition-all duration-300 group">
                    <td className="px-10 py-8">
                      <div>
                        <p className="text-base font-black text-slate-900 tracking-tight">{campaign.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">ID: {campaign.id}</p>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className={clsx(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                        campaign.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                      )}>
                        <div className={clsx("w-1.5 h-1.5 rounded-full", campaign.status === 'active' ? "bg-green-600" : "bg-slate-400")} />
                        {campaign.status}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-sm font-bold text-slate-900 tabular-nums">${campaign.spend.toLocaleString()}</td>
                    <td className="px-10 py-8 text-sm font-bold text-slate-900 tabular-nums">{campaign.conversions.toLocaleString()}</td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        <span className={clsx(
                          "text-sm font-black tabular-nums",
                          campaign.roas > 3 ? "text-green-600" : "text-slate-900"
                        )}>{campaign.roas.toFixed(2)}x</span>
                        {campaign.roas > 3 ? <TrendingUp className="w-3 h-3 text-green-500" /> : <TrendingDown className="w-3 h-3 text-slate-300" />}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-sm font-bold text-slate-500 tabular-nums">{campaign.ctr.toFixed(2)}%</td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        onClick={() => toast(`Audit details for ${campaign.id}`)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-10 py-20 text-center text-slate-400 font-bold">No campaigns found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-8 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {paginatedCampaigns.length} of {filteredCampaigns.length} campaigns
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black text-slate-900 px-4">Page {page} of {totalPages || 1}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
