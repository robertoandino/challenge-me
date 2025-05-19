export type ChallengeCategory = 'physical' | 'mental' | 'creative' | 'social';

export interface Challenge {
    id: number;
    text: string;
    category: 'physical' | 'mental' | 'creative' | 'social' | 'all';
    difficulty: 'easy' | 'medium' | 'hard';
}