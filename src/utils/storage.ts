import { challenges } from "../data/challenges";
import type { ChallengeCategory, Difficulty } from "../data/Challenge";

export type { Difficulty };

export const KEYS = {
    challengeState: "challengeState",
    trainingLogs: "trainingLogs",
    theme: "theme",
    profile: "profile",
    weeklyGoal: "weeklyGoal",
} as const;

export const DIFFICULTIES: readonly Difficulty[] = ["easy", "medium", "hard"];

export const DEFAULT_CHALLENGE = "Time to train";

// Bump when the saved shape changes, and add a migration in loadChallengeState.
// v1: history held challenge text. v2: history holds challenge ids.
export const STATE_VERSION = 2;

export interface ChallengeState {
    version: number;
    currentChallenge: string;
    difficulty: Difficulty;
    selectedCategory: ChallengeCategory | "all";
    challengeHistory: number[]; // ids of challenges, newest first.
    completedDates: string[]; // local YYYY-MM-DD; the streak is derived from these
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

/* Challenge State */

export function loadChallengeState(): ChallengeState {
    const s = readJSON<Partial<ChallengeState>>(KEYS.challengeState, {});
    return {
        version: STATE_VERSION,
        currentChallenge: s.currentChallenge || DEFAULT_CHALLENGE,
        difficulty: DIFFICULTIES.includes(s.difficulty as Difficulty) ? (s.difficulty as Difficulty as Difficulty) : "easy",
        selectedCategory: s.selectedCategory || "all",
        challengeHistory: Array.isArray(s.challengeHistory) ? s.challengeHistory : [],
        completedDates: Array.isArray(s.completedDates) ? s.completedDates : [],
        completedCount: s.completedCount ?? 0,
        hasGenerated: !!s.hasGenerated,
        isChallengeCompleted: !!s.isChallengeCompleted,
    };
}

/* Theme */

export type Theme = "dark" | "light";

export function loadTheme(): Theme {
    try {
        return localStorage.getItem(KEYS.theme) === "light" ? "light" : "dark";
    } catch {
        return "dark";
    }
}

export function saveTheme(theme: Theme): void {
    try {
        localStorage.setItem(KEYS.theme, theme);
    } catch {
        /* ignore */
    }
}