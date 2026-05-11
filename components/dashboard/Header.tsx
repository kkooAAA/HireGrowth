"use client";

import { signOut } from "next-auth/react";
import { Bell, Search, LogOut, User } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  user: any;
}

export default function Header({ user }: HeaderProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-th-blue transition-colors" />
          <input
            type="text"
            placeholder="Search campaigns, analytics, or insights..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-th-blue/20 focus:border-th-blue transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-th-red rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 leading-none">{user?.name || "User"}</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-medium">Administrator</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-th-blue flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
              {user?.name?.[0] || <User className="w-5 h-5" />}
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs text-gray-500">Signed in as</p>
                <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <User className="w-4 h-4" /> Profile Settings
              </button>
              <button 
                onClick={() => signOut()}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-th-red hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
