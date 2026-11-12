export type ChallengeCategory = 'physical' | 'mental' | 'creative' | 'social';
export type Difficulty = "easy" | "medium" | "hard";

export interface Challenge {
    id: number;
    text: string;
    category: ChallengeCategory;
    difficulty: Difficulty;
}