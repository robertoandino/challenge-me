import { useState, useMemo, useRef, useEffect } from "react";
import { challenges } from "../../data/challenges";
import type { ChallengeCategory } from "../../data/Challenge";
import { quotes, Quote } from "../../data/quotes";
import "../../styles/theme.css";
import "./Home.css";
import "../responsive.css";
import Header from "../../components/Header/Header";
import StatCard from "../../components/StatCard/StatCard";
import ChallengeBox from "../../components/ChallengeBox/ChallengeBox";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import DailyQuoteCard from "../../components/DailyQuoteCard/DailyQuoteCard";
//import profileMenu from "../components/ProfileMenu";
//import ProgressRing from "../components/ProgressRing/ProgressRing";
import TrainingLogModal from "../../components/TrainingLogModal/TrainingLogModal";
import { TrainingLog } from "../../types/TrainingLog";
import {
    DEFAULT_CHALLENGE,
    DIFFICULTIES,
    KEYS,
    calcStreak,
    dateKey,
    loadChallengeState,
    loadTheme,
    readJSON,
    removeKey,
    writeJSON,
    type ChallengeState,
    type Difficulty,
} from "../../utils/storage";

const CATEGORIES: readonly (ChallengeCategory | "all")[] = ["all", "physical", "mental", "creative", "social"];

const nextOf = <T,>(list: readonly T[], current: T): T => 
    list[(list.indexOf(current) + 1) % list.length];

// Stable number per calendar day (local time), used to pick the daily quote and challenge.
const daySeed = (d = new Date()) => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();

function Home() {
    // Everything persisted is read once, synchronously, so there is no flash or flag.
    const [saved] = useState(loadChallengeState);

    const [currentChellenge, setCurrentChallenge] = useState(saved.currentChallenge);
    const [difficulty, setDifficulty] = useState<Difficulty>(saved.difficulty);
    const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | "all">(saved.selectedCategory);
    const [challengeHistory, setChallengeHistory] = useState<string[]>(saved.challengeHistory);
    const [completedDates, setCompletedDates] = useState<Set<string>>(() => new Set(saved.completedDates));
    const [completedCount, setCompletedCount] = useState(saved.completedCount);
    const [hasGenerated, setHasGenerated] = useState(saved.hasGenerated);
    const [isChallengeCompleted, setIsChallengeCompleted] = useState(saved.isChallengeCompleted);

    const [isGenerating, setIsGenerating] = useState(false);
    const [emptyMessage, setEmptyMessage] = useState("");
    const [showStreakReaction, setShowStreakReaction] = useState(false);
    const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
    const [showLogModal, setShowLogModal] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    // The streak is never stored: it is always derived from the days you completed something.
    const streakCount = useMemo(() => calcStreak(completedDates), [completedDates]);

    const dailyChallenge = useMemo(() => challenges[daySeed() % challenges.length]?.text ?? "", []);
    const dailyQuote = useMemo(() => quotes[daySeed() % quotes.length] ?? null, []);

    
}

export default Home;