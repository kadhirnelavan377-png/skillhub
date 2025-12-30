import React from 'react';
import { LayoutDashboard, GitBranch, PlusCircle, Sparkles, LogOut, UserCheck, Settings as SettingsIcon } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'My Vault', icon: LayoutDashboard },
    { id: 'tree', label: 'Skill Tree', icon: GitBranch },
    { id: 'create', label: 'Seal Capsule', icon: PlusCircle },
  ];

  return (
    <aside className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="text-white" size={24} />
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tight text-white">SkillTime</span>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-sm shadow-indigo-500/10' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <item.icon size={24} className={activeTab === item.id ? 'text-indigo-400' : 'group-hover:scale-110 transition-transform'} />
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <div 
          onClick={() => {
            // Secret way to enter settings with admin intent
            setActiveTab('settings');
          }}
          className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-3 hidden md:block cursor-pointer hover:bg-indigo-900/40 transition-colors group"
        >
          <div className="flex items-center gap-2 mb-1">
            <UserCheck size={14} className="text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Creator</span>
          </div>
          <p className="text-xs font-semibold text-slate-200 truncate">KADHIRNELAVAN SR</p>
        </div>
        
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-4 transition-colors w-full px-2 py-2 rounded-lg ${
            activeTab === 'settings' ? 'text-indigo-400 bg-slate-800' : 'text-slate-500 hover:text-indigo-400'
          }`}
        >
          <SettingsIcon size={20} />
          <span className="hidden md:block">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;