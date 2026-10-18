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
import { flushSync } from "react-dom";

const CATEGORIES: readonly (ChallengeCategory | "all")[] = ["all", "physical", "mental", "creative", "social"];

const nextOf = <T,>(list: readonly T[], current: T): T => 
    list[(list.indexOf(current) + 1) % list.length];

// Stable number per calendar day (local time), used to pick the daily quote and challenge.
const daySeed = (d = new Date()) => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();

function Home() {
    // Everything persisted is read once, synchronously, so there is no flash or flag.
    const [saved] = useState(loadChallengeState);

    const [currentChallenge, setCurrentChallenge] = useState(saved.currentChallenge);
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

    /* Timers are tracked so they are cleared on unmount and never stack. */
    const timers = useRef<number[]>([]);
    const later = (fn: () => void, ms: number) => {
        timers.current.push(window.setTimeout(fn, ms));
    };
    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach(clearTimeout);
    }, []);

    /* Apply the saved theme on this page too (Profile component owns the toggle). */
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", loadTheme());
    }, []);

    /* Persist on every change. */
    useEffect(() => {
        const payload: ChallengeState = {
            currentChallenge,
            difficulty,
            selectedCategory,
            challengeHistory,
            completedDates: Array.from(completedDates),
            completedCount,
            hasGenerated,
            isChallengeCompleted,
        };
        writeJSON(KEYS.challengeState, payload);
    }, [
        currentChallenge,
        difficulty,
        selectedCategory,
        challengeHistory,
        completedDates,
        completedCount,
        hasGenerated,
        isChallengeCompleted,
    ]);

    const showToast = (text: string) => setToast({ id: Date.now(), text });

    /* Selection */
    const cycleDifficulty = () => {
        setDifficulty((d) => nextOf(DIFFICULTIES, d));
        setEmptyMessage("");
    };

    const cycleCategory = () => {
        setSelectedCategory((c) => nextOf(CATEGORIES, c));
        setEmptyMessage("");
    }

    /* Generate */
    const generateChallenge = () => {
        if (isGenerating) return;
        setIsGenerating(true);
        setEmptyMessage("");

        later(() => {
            const pool = challenges.filter(
                (c) => (selectedCategory === "all" || c.category === selectedCategory) && c.difficulty === difficulty
            );

            if (pool.length === 0){
                setEmptyMessage("No challenges found for this category and difficulty. Try a different combination.");
                setIsGenerating(false);
                return;
            }

            // Avoid repeating the last few challenges unless the pool is too small.
            const fresh = pool.filter((c) => !challengeHistory.includes(c.text));
            const choices = fresh.length > 0 ? fresh : pool;
            const next = choices[Math.floor(Math.random() * choices.length)];

            setCurrentChallenge(next.text);
            setChallengeHistory((prev) => [next.text, ...prev].slice(0, 5));
            setIsChallengeCompleted(false);
            setHasGenerated(true);
            setIsGenerating(false);
        }, 500);
    };

    /* Complete */
    const handleCompletedClick = () => {
        if (!hasGenerated || isChallengeCompleted || isGenerating) return;

        setIsChallengeCompleted(true);
        setCompletedCount((n) => n + 1);
        setCompletedDates((prev) => new Set(prev).add(dateKey()));
        showToast("✅ Challenge completed!")
        setShowLogModal(true);
    };

    const handleStreakClick = () => {
        setShowStreakReaction(true);
        later(() => setShowStreakReaction(false), 1500);
    };

    const handleCopy = async () => {
        if (emptyMessage) return;
        try {
            await navigator.clipboard.writeText(currentChallenge);
            showToast("Copied to clipboard");
        } catch {
            showToast("Couldn't copy. Select the text instead.")
        }
    };

    const handleSaveLog = (log: TrainingLog) => {
        const existing = readJSON<TrainingLog[]>(KEYS.trainingLogs, []);
        writeJSON(KEYS.trainingLogs, [log, ...(Array.isArray(existing) ? existing : [])]);
    };

    /* Temp Dev use only */
    const clearChallengeData = () => {
        if (!window.confirm("Reset all progress? This clears your streak, stats and training log.")) return;

        removeKey(KEYS.trainingLogs);
        setCurrentChallenge(DEFAULT_CHALLENGE);
        setDifficulty("easy");
        setSelectedCategory("all");
        setChallengeHistory([]);
        setCompletedDates(new Set());
        setCompletedCount(0);
        setHasGenerated(false);
        setIsChallengeCompleted(false);
        setEmptyMessage("");
    };

    return(
        <main className="main-container">
            <Header
                dailyChallenge={dailyChallenge}
                completedCount={completedCount}
                currentChallenge={currentChallenge}
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
            />

            <DailyQuoteCard dailyQuote={dailyQuote} />

            <section className="stats-cards">
                <StatCard
                    title="Streak Count"
                    value={streakCount}
                    showReaction={showStreakReaction}
                    onClick={handleStreakClick}
                    info="Streak"
                />
                <StatCard
                    title="Mark as completed"
                    value={completedCount}
                    onClick={handleCompletedClick}
                    info="Completed"
                    disabled={!hasGenerated || isChallengeCompleted || isGenerating || !!emptyMessage}
                />
                <StatCard
                    title="Select Difficulty"
                    value={difficulty}
                    onClick={cycleDifficulty}
                    info="Difficulty"
                />
                <StatCard
                    title="Select Category"
                    value={selectedCategory}
                    onClick={cycleCategory}
                    info="Category"
                />
            </section>

            <div className="challenge-section">
                <ChallengeBox
                    currentChallenge={emptyMessage || currentChallenge}
                    isGenerating={isGenerating}
                />
                <ButtonGroup
                    isGenerating={isGenerating}
                    hasGenerated={hasGenerated}
                    onGenerate={generateChallenge}
                    onCopy={handleCopy}
                />
            </div>

            {/* Live region stays mounted so screen readers announce toasts. */}
            <div role="status" aria-live="polite">
                {toast && (
                    <div
                        key={toast.id}
                        className="completion-toast"
                        onAnimationEnd={() => setToast(null)}
                    >
                        {toast.text}
                    </div>
                )}
            </div>

        </main>
    )
}

export default Home;