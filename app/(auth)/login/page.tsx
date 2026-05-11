"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TrendingUp, Lock, Mail, ChevronRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials. Try admin@dee.com / password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Left Side - Visual/Marketing */}
      <div className="hidden lg:flex lg:w-1/2 thai-gradient relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-full h-full border-[1px] border-white rounded-full scale-150 animate-[spin_60s_linear_infinite]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-full h-full border-[1px] border-white rounded-full scale-125 animate-[spin_40s_linear_infinite_reverse]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium">
            <Sparkles className="w-4 h-4 text-th-white" />
            AI-Powered Marketing Intelligence
          </div>
          
          <h1 className="text-6xl font-black text-white italic tracking-tighter leading-none">
            dee <br /><span className="text-th-white opacity-80">insights</span>
          </h1>
          
          <div className="max-w-md mx-auto space-y-6">
            <p className="text-blue-100 text-lg leading-relaxed font-light">
              Transform your advertising data into growth. Built for the next generation of Thai digital enterprises.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'ROAS Focus', value: '+45%' },
                { label: 'Automation', value: 'Live' }
              ].map((item) => (
                <div key={item.label} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl text-left">
                  <p className="text-white font-bold text-2xl">{item.value}</p>
                  <p className="text-blue-200 text-xs uppercase tracking-widest mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-th-blue/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-th-red/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-10 relative z-10"
        >
          <div className="lg:hidden text-center mb-12">
            <h2 className="text-4xl font-black text-th-blue italic tracking-tighter">dee insights</h2>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h3>
            <p className="text-slate-500 font-medium">Sign in to manage your performance</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 text-sm text-th-red bg-red-50 rounded-xl border border-th-red/20 font-medium flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-th-red animate-pulse" />
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="space-y-2 group">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-th-blue transition-colors" />
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-th-blue/10 focus:border-th-blue transition-all outline-none font-medium placeholder:text-slate-300"
                    placeholder="admin@dee.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                  <button type="button" className="text-[10px] font-bold text-th-blue uppercase hover:underline">Forgot?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-th-blue transition-colors" />
                  <input
                    type="password"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-th-blue/10 focus:border-th-blue transition-all outline-none font-medium placeholder:text-slate-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-th-blue text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] disabled:opacity-70 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign into Dashboard
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-[10px]"><span className="bg-[#F8FAFC] px-4 text-slate-400 font-bold uppercase tracking-widest">Global Authentication</span></div>
          </div>

          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 bg-white py-3.5 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm group"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </motion.div>
      </div>
    </div>
  );
}
