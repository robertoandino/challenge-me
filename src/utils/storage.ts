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

/* Dates */

// Local-time YYYY-MM-DD. toISOString() is UTC and shifts the date in the evening for anyone west of UTC.
export const dateKey = (d: Date = new Date()): string =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

//Consecutive days ending today. If today isn't done yet, the streak is still alive until midnight.
export function calcStreak(dates: ReadonlySet<string>): number {
    const day = new Date();
    if (!dates.has(dateKey(day))) day.setDate(day.getDate() - 1);

    let n = 0;
    while (dates.has(dateKey(day))) {
        n++;
        day.setDate(day.getDate() - 1);
    }
    return n;
}

