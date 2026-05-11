"use client";

import { Settings as SettingsIcon, Bell, Lock, Globe, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">Manage your organization and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-2">
          <nav className="space-y-1">
            {['General', 'Notifications', 'Security', 'Integrations', 'Billing'].map((tab) => (
              <button
                key={tab}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === 'General' ? 'bg-th-blue text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-th-blue" />
              Organization Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company Name</label>
                <input type="text" defaultValue="dee insights" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Timezone</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                  <option>(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-th-blue" />
              Data Connection
            </h3>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-green-800">Supabase Connected</p>
              </div>
              <button className="text-xs font-bold text-green-700 hover:underline uppercase">Sync Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
