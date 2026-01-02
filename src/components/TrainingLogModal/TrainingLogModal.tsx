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
        <div className="log-overlay">
            <div className="log-modal">
                <h2>Log Your Training</h2>
                <p className="challenge-name">{challengeTitle}</p>
            
                {/*Mood Before*/}
                <section>
                    <h4>Mood Before</h4>
                    <div className="mood-row">
                        {moods.map((mood) => (
                            <button
                                key={mood}
                                className={`mood-btn ${moodBefore === mood ? "active" : ""}`}
                                onClick={() => setMoodBefore(mood)}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </section>

                {/*Mood After*/}
                <section>
                    <h4>Mood After</h4>
                    <div className="mood-row">
                        {moods.map((mood) => (
                            <button
                                key={mood}
                                className={`mood-btn ${moodAfter === mood ? "active" : ""}`}
                                onClick={() => setMoodAfter(mood)}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Difficulty*/}
                <section>
                    <h4>Difficulty</h4>
                    <div className="difficulty-row">
                        {[1, 2, 3, 4, 5].map((level) => (
                            <span
                                key={level}
                                className={`difficulty-dot ${
                                    difficulty && difficulty >= level ? "filled" : ""
                                }`}
                                onClick={() => setDifficulty(level as any)}
                            />
                        ))}
                    </div>
                </section>
                
                {/* Takeaway */}
                <section>
                    <h4>Takeaway</h4>
                    <input
                        type="text"
                        maxLength={120}
                        placeholder="one thing you noticed today..."
                        value={takeaway}
                        onChange={(e) => setTakeaway(e.target.value)}
                    />
                </section>

                {/* Actions */}
                <div className="log-actions">
                    <button onClick={onClose} className="cancel-btn">
                        Skip
                    </button>
                    <button onClick={handleSave} className="save-btn">
                        Save Log
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TrainingLogModal;