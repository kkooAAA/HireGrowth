"use client";

import { useEffect, useState } from "react";
import { fetchCampaigns } from "@/lib/analytics/fetchAdData";
import { Campaign } from "@/types/analytics";
import { Download, FileText, Search } from "lucide-react";

export default function ReportsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns().then(c => {
      setCampaigns(c);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Reports</h1>
          <p className="text-gray-500">Export and manage your advertising data.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-th-blue text-white rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all shadow-lg">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-th-blue"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none focus:border-th-blue">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Paused</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Impressions</th>
                <th className="px-6 py-4">Clicks</th>
                <th className="px-6 py-4">Spend</th>
                <th className="px-6 py-4">Conversions</th>
                <th className="px-6 py-4">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded text-th-blue">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{campaign.impressions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{campaign.clicks.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${campaign.spend.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{campaign.conversions}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{campaign.roas.toFixed(2)}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
