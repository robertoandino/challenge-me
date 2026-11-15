import type { Challenge, ChallengeCategory, Difficulty } from "../data/Challenge";

/**
 * Pick a challenge for the chosen filters.
 * 
 * - "all" picks a category first, so every category gets an equal share even when 
 *    one has more challenges than the others.
 * - Challenges in 'recentIds' are skipped unless nothing else is left.
 * - Returns null when no challenge matches the filters.
 */
export function pickChallenge(
    all: readonly Challenge[],
    category: ChallengeCategory | "all",
    difficulty: Difficulty,
    recentIds: readonly number[],
    random: () => number = Math.random
): Challenge | null {
    const pool = all.filter(
        (c) => c.difficulty === difficulty && (category === "all" || c.category === category)
    );

    return null;
}