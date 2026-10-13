import type { ChallengeCategory } from "../data/Challenge";

export const KEYS = {
    challengeState: "challengeState",
    traininglogs: "trainingLogs",
    theme: "theme",
    profile: "profile",
    weeklyGoal: "weeklyGoal",
} as const;

export type Difficulty = "easy" | "medium" | "hard";
export const DIFFICULTIES: readonly Difficulty[] = ["easy", "medium", "hard"];

export const DEFAULT_CHALLENGE = "Time to train";

export interface ChallengeState {
    currentChallenge: string;
    difficulty: Difficulty;
    selectedCategory: ChallengeCategory | "all";
    completedDates: string[];
    completedCount: number;
    hasGenerated: boolean;
    isChallengeCompleted: boolean;
}

/* LocalStorage (never throws) */

export function readJSON<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

export function writeJSON(key: string, value: unknown): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        /* storage unavailable (private mode / quota): keep running in memory */
    }
}

export function removeKey(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch {
        /* ignore */
    }
}

