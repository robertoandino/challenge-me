export interface TrainingLog {
    id: string;
    date: string; // YYYY-MM-DD
    challenge: string;
    moodBefore: "😞" | "😐" | "🙂" | "💪";
    moodAfter: "😞" | "😐" | "🙂" | "💪";
    difficulty: 1 | 2 | 3 | 4 | 5;
    takeaway: string;
}