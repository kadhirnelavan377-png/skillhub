
import React, { useState } from 'react';
import { AppState, Capsule, Skill } from '../types';
import { Lock, Save, X, MessageCircle, AlertCircle } from 'lucide-react';
import { getIcon } from '../constants';

interface CreateCapsuleProps {
  state: AppState;
  onSave: (capsule: Capsule) => void;
  onCancel: () => void;
}

const CreateCapsule: React.FC<CreateCapsuleProps> = ({ state, onSave, onCancel }) => {
  const [selectedSkillId, setSelectedSkillId] = useState(state.skills[0]?.id || '');
  const [content, setContent] = useState('');
  const [messageToFuture, setMessageToFuture] = useState('');
  const [duration, setDuration] = useState(1); // months

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !messageToFuture) return;

    const newCapsule: Capsule = {
      id: Math.random().toString(36).substr(2, 9),
      skillId: selectedSkillId,
      type: 'text',
      content,
      messageToFuture,
      createdAt: Date.now(),
      lockDurationMonths: duration,
      unlockAt: Date.now() + (duration * 30 * 24 * 60 * 60 * 1000),
      isUnlocked: false
    };

    onSave(newCapsule);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Seal a Time Capsule</h1>
          <p className="text-slate-400">Record your current level and leave a message for your future self.</p>
        </div>
        <button onClick={onCancel} className="text-slate-500 hover:text-white p-2">
          <X size={24} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            Step 1: Select Skill Track
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {state.skills.map((skill) => (
              <button
                key={skill.id}
                type="button"
                onClick={() => setSelectedSkillId(skill.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-2 ${
                  selectedSkillId === skill.id 
                    ? 'border-indigo-600 bg-indigo-600/10 text-white' 
                    : 'border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div style={{ color: selectedSkillId === skill.id ? '#818cf8' : 'inherit' }}>
                  {getIcon(skill.icon, 32)}
                </div>
                <span className="text-xs font-bold truncate w-full">{skill.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            Step 2: Describe your Current Level
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="e.g. 'I just learned how to write a simple for-loop in Python. I struggle with nested loops still, but I built a small guessing game today!'"
            className="w-full h-40 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all placeholder:text-slate-600"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            Step 3: Message to Future Me
          </label>
          <div className="relative">
            <MessageCircle className="absolute top-4 left-4 text-slate-500" size={20} />
            <textarea
              value={messageToFuture}
              onChange={(e) => setMessageToFuture(e.target.value)}
              placeholder="What do you hope you have achieved when this unlocks? 'By next month, I hope I can write a full web scraper without looking at tutorials!'"
              className="w-full h-24 bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all placeholder:text-slate-600 italic"
              required
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            Step 4: Lock Duration
          </label>
          <div className="flex gap-4">
            {[1, 3, 6, 12].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setDuration(m)}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  duration === m 
                    ? 'bg-slate-200 text-slate-900' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {m} Month{m > 1 ? 's' : ''}
              </button>
            ))}
          </div>
          <p className="text-slate-500 text-xs flex items-center gap-2 px-2 mt-2">
            <AlertCircle size={14} />
            Note: You won't be able to open this until the time is up! No peeking.
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-xl shadow-indigo-600/20 mt-8"
        >
          <Lock size={20} />
          Seal Capsule Until {new Date(Date.now() + (duration * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
        </button>
      </form>
    </div>
  );
};

export default CreateCapsule;
