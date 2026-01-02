export interface TrainingLog {
    id: string;
    date: string; 
    challenge: string;
    moodBefore: string;
    moodAfter: string;
    difficulty: number;
    takeaway?: string;
}