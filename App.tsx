
import React, { useState, useEffect } from 'react';
import { Skill, Capsule, AppState } from './types';
import { DEFAULT_SKILLS } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreateCapsule from './components/CreateCapsule';
import SkillTree from './components/SkillTree';
import GrowthMirror from './components/GrowthMirror';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tree' | 'create' | 'mirror'>('dashboard');
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('skill_time_capsule_state');
    return saved ? JSON.parse(saved) : { skills: DEFAULT_SKILLS, capsules: [] };
  });
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('skill_time_capsule_state', JSON.stringify(state));
  }, [state]);

  const addSkill = (skill: Skill) => {
    setState(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  };

  const addCapsule = (capsule: Capsule) => {
    setState(prev => ({ ...prev, capsules: [...prev.capsules, capsule] }));
    setActiveTab('dashboard');
  };

  const unlockCapsule = (id: string) => {
    setSelectedCapsuleId(id);
    setActiveTab('mirror');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} onUnlock={unlockCapsule} onStartCreate={() => setActiveTab('create')} />;
      case 'tree':
        return <SkillTree state={state} />;
      case 'create':
        return <CreateCapsule state={state} onSave={addCapsule} onCancel={() => setActiveTab('dashboard')} />;
      case 'mirror':
        const cap = state.capsules.find(c => c.id === selectedCapsuleId);
        const skill = state.skills.find(s => s.id === cap?.skillId);
        return <GrowthMirror capsule={cap} skill={skill} onBack={() => setActiveTab('dashboard')} />;
      default:
        return <Dashboard state={state} onUnlock={unlockCapsule} onStartCreate={() => setActiveTab('create')} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
