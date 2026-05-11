"use client";

import { useEffect, useState } from "react";
import { fetchDailyMetrics } from "@/lib/analytics/fetchAdData";
import { DailyMetric } from "@/types/analytics";
import SpendConversionChart from "@/components/charts/SpendConversionChart";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const [data, setData] = useState<DailyMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyMetrics().then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="animate-pulse h-96 bg-gray-100 rounded-xl"></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-500">In-depth performance analysis and trends.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Calendar className="w-4 h-4" /> Last 30 Days
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendConversionChart data={data} />
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
          <TrendingUp className="w-12 h-12 text-th-blue/20 mb-4" />
          <h3 className="font-bold text-gray-900">Performance Heatmap</h3>
          <p className="text-sm text-gray-500 max-w-xs mt-2">
            Detailed hourly and geographic performance data will appear here.
          </p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Device Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Mobile', 'Desktop', 'Tablet'].map((device, i) => (
            <div key={device} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase font-bold">{device}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{[45, 35, 20][i]}%</p>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3">
                <div className="bg-th-blue h-full rounded-full" style={{ width: `${[45, 35, 20][i]}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
