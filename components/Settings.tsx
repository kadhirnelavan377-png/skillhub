import React, { useState } from 'react';
import { AppState, Skill } from '../types';
import { 
  ShieldAlert, Database, Trash2, Download, 
  ArrowLeft, Plus, Cpu, Terminal, 
  Zap, Save, Info, AlertTriangle
} from 'lucide-react';
import { getIcon } from '../constants';

interface SettingsProps {
  state: AppState;
  onReset: () => void;
  onUpdateSkills: (skills: Skill[]) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ state, onReset, onUpdateSkills, onBack }) => {
  const [adminKey, setAdminKey] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  
  // The secret "Creator" key
  const CREATOR_SECRET = "KADHIR_AUTHORITY_2024";

  const handleUnlockCreator = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === CREATOR_SECRET) {
      setIsAdmin(true);
      setAdminKey('');
    } else {
      alert("Unauthorized Access Attempt Detected.");
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "skill_time_capsule_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const addCustomSkill = () => {
    if (!newSkillName) return;
    const newSkill: Skill = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSkillName,
      category: 'custom',
      icon: 'Rocket',
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      createdAt: Date.now()
    };
    onUpdateSkills([...state.skills, newSkill]);
    setNewSkillName('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="bg-slate-800 hover:bg-slate-700 p-2 rounded-xl text-slate-300 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">System Control</h1>
          <p className="text-slate-400">Manage your vault and authority settings.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Settings */}
        <div className="space-y-6">
          <section className="glass-card rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Database className="text-indigo-400" size={20} />
              Local Storage
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                All your growth data is stored locally in your browser. Clearing your browser cache will erase your capsules.
              </p>
              <button 
                onClick={handleExport}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Download size={18} className="text-indigo-400" />
                  <span className="font-semibold text-slate-200">Export Vault Backup</span>
                </div>
                <Zap size={16} className="text-slate-600 group-hover:text-indigo-400" />
              </button>
            </div>
          </section>

          <section className="glass-card rounded-3xl p-8 border-indigo-500/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Info className="text-indigo-400" size={20} />
              About SkillTime
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Designed for lifelong learners. Your progress is compared using Gemini 3 Flash, focusing on qualitative growth rather than quantitative scores.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-800 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
              Build Version: 1.0.4-Stable
            </div>
          </section>
        </div>

        {/* Creator Access Area */}
        <div className="space-y-6">
          {!isAdmin ? (
            <section className="glass-card rounded-3xl p-8 border-dashed border-2 border-slate-800">
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <ShieldAlert size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">Restricted Area</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Creator Authority</h3>
              <p className="text-sm text-slate-400 mb-6">Enter the secret key to unlock high-level system controls.</p>
              <form onSubmit={handleUnlockCreator} className="flex gap-2">
                <input 
                  type="password" 
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Master Key..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-4 rounded-xl text-white transition-all shadow-lg shadow-indigo-600/20">
                  Verify
                </button>
              </form>
            </section>
          ) : (
            <div className="animate-fade-in-up space-y-6">
              {/* ADMIN CONTROLS */}
              <section className="glass-card rounded-3xl p-8 border-amber-500/30 ring-1 ring-amber-500/10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Authority Active</h2>
                      <p className="text-xs text-amber-500/70 font-bold uppercase tracking-tighter">Welcome back, Kadhirnelavan</p>
                    </div>
                  </div>
                  <button onClick={() => setIsAdmin(false)} className="text-slate-500 hover:text-white transition-colors">
                    Lock
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Skill Forge</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        placeholder="Force New Skill Name..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none"
                      />
                      <button 
                        onClick={addCustomSkill}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 px-4 rounded-xl flex items-center gap-2 font-bold text-xs"
                      >
                        <Plus size={16} /> ADD
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {
                        if(confirm("DANGER: This will wipe all current skills and capsules. Continue?")) {
                          onReset();
                        }
                      }}
                      className="p-4 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-2xl flex flex-col items-center gap-2 group transition-all"
                    >
                      <Trash2 size={20} className="text-rose-500 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-rose-500">Hard Reset</span>
                    </button>

                    <button 
                      onClick={() => console.log(state)}
                      className="p-4 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-2xl flex flex-col items-center gap-2 group transition-all"
                    >
                      <Cpu size={20} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-indigo-500">Log State</span>
                    </button>
                  </div>

                  <div className="mt-4 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/20 flex gap-3">
                    <AlertTriangle size={24} className="text-amber-500 shrink-0" />
                    <p className="text-[10px] text-amber-500/80 leading-tight">
                      CAUTION: Changes made here bypass standard validation. Ensure manual state integrity before deploying further updates.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;