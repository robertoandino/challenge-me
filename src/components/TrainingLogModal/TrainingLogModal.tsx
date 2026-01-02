import React, { useState } from 'react';
import { TrainingLog } from '../../types/TrainingLog.ts';
import "./TrainingLogModal.css";

const moods = ["😞", "😐", "🙂", "💪"] as const;

interface TrainingLogModalProps {
    challengeTitle: string;
    onClose: () => void;
    onSave: (log: TrainingLog) => void;
}

const TrainingLogModal: React.FC<TrainingLogModalProps> = ({
    challengeTitle,
    onClose,
    onSave,
}) => {
    const [moodBefore, setMoodBefore] = useState<typeof moods[number] | null>(null);
    const [moodAfter, setMoodAfter] = useState<typeof moods[number] | null>(null);
    const [difficulty, setDifficulty] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
    const [takeaway, setTakeaway] = useState("");

    const handleSave = () => {
        if (!moodBefore || !moodAfter || !difficulty) return;

        const log: TrainingLog = {
            id: crypto.randomUUID(),
            date: new Date().toISOString().split('T')[0],
            challenge: challengeTitle,
            moodBefore,
            moodAfter,
            difficulty,
            takeaway,
        };

        onSave(log);
        onClose();
    }

    return (
        <div>Coming soon</div>
    );
}

export default TrainingLogModal;