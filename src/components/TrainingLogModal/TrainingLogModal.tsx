import { useEffect, useRef, useState, type FormEvent } from 'react';
import { TrainingLog } from '../../types/TrainingLog.ts';
import { dateKey } from "../../utils/storage"; 
import "./TrainingLogModal.css";

const MOODS = [
    { emoji: "😔", label: "Low" },
    { emoji: "😑", label: "Flat" },
    { emoji: "🫠", label: "Good" },
    { emoji: "🦾", label: "Strong" },
] as const;

const LEVELS = [1, 2, 3, 4, 5] as const;

type Mood = (typeof MOODS)[number]["emoji"];
type Level = (typeof LEVELS)[number];

interface TrainingLogModalProps {
    challengeTitle: string;
    onClose: () => void;
    onSave: (log: TrainingLog) => void;
}

interface MoodPickerProps {
    legend: string;
    value: Mood | null;
    onChange: (mood: Mood) => void;
}

function MoodPicker({ legend, value, onChange }: MoodPickerProps) {
    return (
        <fieldset className="log-field">
            <legend>{legend}</legend>
            <div className="mood-row"></div>
                {MOODS.map((m) => (
                    <button
                        key={m.emoji}
                        type="button"
                        className={`mood-btn${value === m.emoji ? " active" : ""}`}
                        aria-pressed={value === m.emoji}
                        aria-label={m.label}
                        title={m.label}
                        onClick={() => onChange(m.emoji)}
                    >
                        {m.emoji}
                    </button>
                ))}
        </fieldset>
    )
}

function TrainingLogModal({ challengeTitle, onClose, onSave }: TrainingLogModalProps) {
    const [moodBefore, setMoodBefore] = useState<Mood | null>(null);
    const [moodAfter, setMoodAfter] = useState<Mood | null>(null);
    const [difficulty, setDifficulty] = useState<Level | null>(null);
    const [takeaway, setTakeaway] = useState("");

    const dialogRef = useRef<HTMLDivElement>(null);

    // Keep the latest onClose in a ref so the effect below runs once. Otherwise every parent
    // re-render (e.g. the toast dissapearing) would re-run it and pull focus out of the input.
    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    })

    return (
        <div className="log-overlay">
            hi
        </div>
    );
}

export default TrainingLogModal;