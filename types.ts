
export type SkillCategory = 'coding' | 'english' | 'maths' | 'creativity' | 'custom';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string;
  color: string;
  createdAt: number;
}

export interface Capsule {
  id: string;
  skillId: string;
  type: 'audio' | 'video' | 'text' | 'challenge';
  content: string; // Text content or base64 data
  messageToFuture: string;
  createdAt: number;
  lockDurationMonths: number;
  unlockAt: number;
  isUnlocked: boolean;
  comparisonResult?: string; // AI feedback
}

export interface GrowthInsight {
  score: number;
  category: string;
  feedback: string;
}

export interface AppState {
  skills: Skill[];
  capsules: Capsule[];
  currentSkillId?: string;
}
