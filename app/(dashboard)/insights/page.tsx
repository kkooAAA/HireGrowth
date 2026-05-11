"use client";

import { useEffect, useState } from "react";
import { fetchCampaigns } from "@/lib/analytics/fetchAdData";
import { generateInsights } from "@/lib/insights/generateInsights";
import { Insight } from "@/types/analytics";
import AISummaryCard from "@/components/dashboard/AISummaryCard";
import { Sparkles, Filter } from "lucide-react";

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns().then(c => {
      setInsights(generateInsights(c));
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-th-blue" />
            dee AI Insights
          </h1>
          <p className="text-gray-500">Automated performance recommendations powered by AI.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Filter className="w-4 h-4" /> Filter by Type
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AISummaryCard insights={insights} />
      </div>
      
      <div className="bg-th-blue rounded-xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold italic mb-2">Predictive Analysis</h3>
          <p className="text-blue-100 mb-6">
            Based on current trends, your account is projected to reach a 4.2x ROAS by the end of the quarter if the recommended optimizations are applied.
          </p>
          <button className="px-6 py-2 bg-white text-th-blue rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
            Generate Q3 Forecast
          </button>
        </div>
        <div className="absolute right-0 top-0 w-64 h-full bg-white/5 skew-x-12 -mr-16"></div>
      </div>
    </div>
  );
}
