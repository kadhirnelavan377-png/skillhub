import React, { useState } from 'react';
import { User } from '../types';
import { Sparkles, ShieldCheck, Fingerprint, ArrowRight, UserCircle, Key } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please identify yourself.');
      return;
    }
    
    setIsInitializing(true);
    setError('');

    // Simulate secure initialization sequence
    setTimeout(() => {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
        lastLogin: Date.now(),
      };
      onLogin(newUser);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-md w-full relative">
        {/* Header Branding */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex p-4 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 mb-6 shadow-2xl shadow-indigo-500/10 group">
            <Sparkles size={48} className="text-indigo-400 group-hover:rotate-12 transition-transform duration-500" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">SkillTime Vault</h1>
          <p className="text-slate-400 font-medium">Initialize Secure Growth Session</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border-white/5 relative overflow-hidden">
          {isInitializing ? (
            <div className="py-12 flex flex-col items-center justify-center animate-pulse">
              <div className="relative mb-8">
                <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                <Fingerprint size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" />
              </div>
              <p className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-xs">Synchronizing Neural Data...</p>
              <div className="w-48 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-indigo-500 animate-[loading_1.5s_ease-in-out_infinite]" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Student Identity</label>
                <div className="relative group">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Vault Access PIN (Optional)</label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••"
                    maxLength={4}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 tracking-[0.5em] transition-all"
                  />
                </div>
              </div>

              {error && (
                <p className="text-rose-500 text-xs font-bold text-center animate-shake">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-xl shadow-indigo-600/20 group"
              >
                <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                Open Vault
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            Secured by Gemini Growth Engine &copy; 2024
          </p>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;