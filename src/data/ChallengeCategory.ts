export type ChallengeCategory = 'physical' | 'mental' | 'creative' | 'social';

export interface Challenge {
    id: number;
    text: string;
    category: ChallengeCategory;
    difficulty: 'easy' | 'medium' | 'hard';
}