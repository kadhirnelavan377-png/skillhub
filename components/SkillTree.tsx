
import React from 'react';
import { AppState } from '../types';
import { getIcon } from '../constants';
import { Sparkles } from 'lucide-react';

interface SkillTreeProps {
  state: AppState;
}

const SkillTree: React.FC<SkillTreeProps> = ({ state }) => {
  return (
    <div className="space-y-12 pb-20">
      <header>
        <h1 className="text-4xl font-bold text-white mb-2">My Growth Tree</h1>
        <p className="text-slate-400">Watch your roots deepen and your branches reach higher.</p>
      </header>

      <div className="relative">
        {/* Connection Lines (Abstract Visualization) */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 800 600">
            <path d="M400,300 C200,300 100,200 100,100" stroke="#4f46e5" strokeWidth="2" fill="none" />
            <path d="M400,300 C600,300 700,200 700,100" stroke="#4f46e5" strokeWidth="2" fill="none" />
            <circle cx="400" cy="300" r="4" fill="#4f46e5" />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.skills.map((skill) => {
            const skillCapsules = state.capsules.filter(c => c.skillId === skill.id);
            const level = skillCapsules.length;
            const progress = Math.min((level / 10) * 100, 100);

            return (
              <div key={skill.id} className="skill-tree-node glass-card rounded-3xl p-8 border-slate-800/50 hover:border-indigo-500/30 transition-all cursor-default">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                  >
                    {getIcon(skill.icon, 32)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
                    <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">{skill.category}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">Evolution Level</span>
                    <span className="text-white font-bold bg-slate-800 px-3 py-1 rounded-full">{level}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="h-full transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                      style={{ 
                        width: `${progress}%`, 
                        backgroundColor: skill.color 
                      }}
                    />
                  </div>
                  
                  <div className="pt-4 flex items-center gap-2 text-slate-400 text-xs italic">
                    <Sparkles size={14} className="text-yellow-500" />
                    {level === 0 
                      ? "Seal your first capsule to plant this seed." 
                      : level < 3 
                        ? "The roots are taking hold!" 
                        : "Your branches are blooming!"}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-5 gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full ${i < level ? 'bg-indigo-500' : 'bg-slate-800'}`} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillTree;
