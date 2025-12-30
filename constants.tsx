
import React from 'react';
import { 
  Code, Book, Hash, Palette, User, 
  Gamepad2, Music, PenTool, Wallet, 
  Mic2, Globe, Brain, Rocket, Camera 
} from 'lucide-react';
import { Skill } from './types';

export const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'Python Basics', category: 'coding', icon: 'Code', color: '#3b82f6', createdAt: Date.now() },
  { id: '2', name: 'English Speaking', category: 'english', icon: 'Mic2', color: '#8b5cf6', createdAt: Date.now() },
  { id: '3', name: 'Algebra Master', category: 'maths', icon: 'Hash', color: '#ef4444', createdAt: Date.now() },
  { id: '4', name: 'Digital Art', category: 'creativity', icon: 'Palette', color: '#ec4899', createdAt: Date.now() },
  { id: '5', name: 'Game Design', category: 'coding', icon: 'Gamepad2', color: '#f59e0b', createdAt: Date.now() },
  { id: '6', name: 'Music Beats', category: 'creativity', icon: 'Music', color: '#10b981', createdAt: Date.now() },
  { id: '7', name: 'Creative Writing', category: 'english', icon: 'PenTool', color: '#6366f1', createdAt: Date.now() },
  { id: '8', name: 'Money Matters', category: 'maths', icon: 'Wallet', color: '#06b6d4', createdAt: Date.now() },
  { id: '9', name: 'Web Wizardry', category: 'coding', icon: 'Globe', color: '#f43f5e', createdAt: Date.now() },
  { id: '10', name: 'Mindfulness', category: 'creativity', icon: 'Brain', color: '#84cc16', createdAt: Date.now() },
  { id: '11', name: 'Launchpad', category: 'custom', icon: 'Rocket', color: '#a855f7', createdAt: Date.now() },
  { id: '12', name: 'Photography', category: 'creativity', icon: 'Camera', color: '#d946ef', createdAt: Date.now() },
];

export const getIcon = (name: string, size = 24, className = "") => {
  switch (name) {
    case 'Code': return <Code size={size} className={className} />;
    case 'Book': return <Book size={size} className={className} />;
    case 'Hash': return <Hash size={size} className={className} />;
    case 'Palette': return <Palette size={size} className={className} />;
    case 'Gamepad2': return <Gamepad2 size={size} className={className} />;
    case 'Music': return <Music size={size} className={className} />;
    case 'PenTool': return <PenTool size={size} className={className} />;
    case 'Wallet': return <Wallet size={size} className={className} />;
    case 'Mic2': return <Mic2 size={size} className={className} />;
    case 'Globe': return <Globe size={size} className={className} />;
    case 'Brain': return <Brain size={size} className={className} />;
    case 'Rocket': return <Rocket size={size} className={className} />;
    case 'Camera': return <Camera size={size} className={className} />;
    default: return <User size={size} className={className} />;
  }
};
