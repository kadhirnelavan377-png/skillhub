
import React from 'react';
import { AppState, Capsule } from '../types';
import { Lock, Unlock, Clock, ArrowRight, Plus } from 'lucide-react';
import { getIcon } from '../constants';

interface DashboardProps {
  state: AppState;
  onUnlock: (id: string) => void;
  onStartCreate: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onUnlock, onStartCreate }) => {
  const sortedCapsules = [...state.capsules].sort((a, b) => b.createdAt - a.createdAt);
  
  const isTimeToUnlock = (capsule: Capsule) => {
    return Date.now() >= capsule.unlockAt;
  };

  const getRemainingTime = (unlockAt: number) => {
    const diff = unlockAt - Date.now();
    if (diff <= 0) return "Ready to Unlock!";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h left`;
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Growth Vault</h1>
          <p className="text-slate-400">Preserving your journey, one milestone at a time.</p>
        </div>
        <button 
          onClick={onStartCreate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          Create New Capsule
        </button>
      </header>

      {state.capsules.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-slate-700">
          <div className="bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
            <Lock size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Your Vault is Empty</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Time capsules are snapshots of your skills. Start by recording where you are today in a skill like coding or English!
          </p>
          <button 
            onClick={onStartCreate}
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
          >
            Create your first capsule &rarr;
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCapsules.map((capsule) => {
            const skill = state.skills.find(s => s.id === capsule.skillId);
            const ready = isTimeToUnlock(capsule);

            return (
              <div 
                key={capsule.id} 
                className={`glass-card rounded-3xl p-6 transition-all group relative overflow-hidden ${
                  ready ? 'border-emerald-500/30 ring-1 ring-emerald-500/20' : 'hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center" 
                    style={{ backgroundColor: `${skill?.color}20`, color: skill?.color }}
                  >
                    {getIcon(skill?.icon || 'User')}
                  </div>
                  {ready ? (
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Unlock size={12} /> Ready
                    </span>
                  ) : (
                    <span className="bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Lock size={12} /> {capsule.lockDurationMonths}m
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{skill?.name || 'Unknown Skill'}</h3>
                <p className="text-slate-500 text-sm mb-6">
                  Sealed on {new Date(capsule.createdAt).toLocaleDateString()}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <Clock size={14} />
                    <span>{ready ? 'Time reached' : getRemainingTime(capsule.unlockAt)}</span>
                  </div>
                  
                  <button 
                    disabled={!ready}
                    onClick={() => onUnlock(capsule.id)}
                    className={`p-2 rounded-xl transition-all ${
                      ready 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer shadow-lg shadow-emerald-500/20' 
                        : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>

                {!ready && (
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center px-6">
                      <p className="text-white font-bold mb-1">Time remains...</p>
                      <p className="text-slate-300 text-xs">This capsule is sealed for {capsule.lockDurationMonths} months.</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
