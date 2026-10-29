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

interface TrainingLogModalProps {
    challengeTitle: string;
    onClose: () => void;
    onSave: (log: TrainingLog) => void;
}

function TrainingLogModal({ challengeTitle, onClose, onSave }: TrainingLogModalProps) {

    return (
        <div className="log-overlay">
            hi
        </div>
    );
}

export default TrainingLogModal;