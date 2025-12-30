
import React, { useState, useEffect } from 'react';
import { Capsule, Skill } from '../types';
import { ArrowLeft, Sparkles, CheckCircle, RefreshCcw, Loader2 } from 'lucide-react';
import { analyzeGrowth } from '../lib/gemini';

interface GrowthMirrorProps {
  capsule?: Capsule;
  skill?: Skill;
  onBack: () => void;
}

const GrowthMirror: React.FC<GrowthMirrorProps> = ({ capsule, skill, onBack }) => {
  const [currentUpdate, setCurrentUpdate] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  if (!capsule || !skill) return <div className="p-8 text-center text-slate-400">Capsule not found.</div>;

  const handleAnalyze = async () => {
    if (!currentUpdate) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeGrowth(
        skill.name,
        capsule.content,
        currentUpdate,
        capsule.messageToFuture
      );
      setAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="bg-slate-800 hover:bg-slate-700 p-2 rounded-xl text-slate-300">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">The Growth Mirror</h1>
          <p className="text-slate-400 font-medium">{skill.name} Journey</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Past Self Card */}
        <div className="glass-card rounded-3xl p-8 border-indigo-500/20 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-600/20 text-indigo-400 w-10 h-10 rounded-xl flex items-center justify-center font-bold">1</div>
            <h3 className="text-xl font-bold text-white">Past You</h3>
          </div>
          <div className="flex-1 bg-slate-950/40 rounded-2xl p-5 border border-slate-800 italic text-slate-300 mb-6 relative">
            <span className="text-4xl absolute -top-2 left-2 text-slate-800 font-serif">"</span>
            {capsule.content}
            <p className="mt-4 text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={12} /> Goal: {capsule.messageToFuture}
            </p>
          </div>
          <p className="text-xs text-slate-500 font-medium">Recorded: {new Date(capsule.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Present Self Input */}
        <div className="glass-card rounded-3xl p-8 border-emerald-500/20 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-600/20 text-emerald-400 w-10 h-10 rounded-xl flex items-center justify-center font-bold">2</div>
            <h3 className="text-xl font-bold text-white">Present You</h3>
          </div>
          <textarea
            value={currentUpdate}
            onChange={(e) => setCurrentUpdate(e.target.value)}
            disabled={!!analysis}
            placeholder="Tell your Past Self what you can do now! Be honest and proud."
            className="flex-1 w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all placeholder:text-slate-600 mb-6 resize-none"
          />
          {!analysis && (
            <button
              onClick={handleAnalyze}
              disabled={!currentUpdate || isAnalyzing}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95"
            >
              {isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              Reflect on Growth
            </button>
          )}
          {analysis && (
            <div className="flex items-center gap-2 text-emerald-400 font-bold justify-center">
              <CheckCircle size={20} /> Reflections Captured
            </div>
          )}
        </div>
      </div>

      {analysis && (
        <div className="animate-fade-in-up space-y-6">
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/40">
                <Sparkles size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">AI Insights</h2>
                <p className="text-slate-400">Comparing your journey from {new Date(capsule.createdAt).toLocaleDateString()} to today.</p>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
              {analysis}
            </div>

            <div className="mt-12 flex flex-col md:flex-row items-center gap-4 border-t border-slate-800/50 pt-8">
              <button 
                onClick={() => setAnalysis(null)}
                className="w-full md:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCcw size={18} />
                Try Another Reflection
              </button>
              <button 
                onClick={onBack}
                className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20"
              >
                Return to Vault
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthMirror;
