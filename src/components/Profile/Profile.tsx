import { useMemo, useState, useEffect} from "react";
//import { useLocation } from "react-router-dom";
import "./Profile.css";
//import avatar from "../../assets/avatar.jpg";
//import TrainingLogModal from "../TrainingLogModal/TrainingLogModal";
import { TrainingLog } from '../../types/TrainingLog.ts';

/* ----------- Badges ------------ */

type Stats = { streak: number; completed: number };

type Badge = {
    id: string;
    label: string;
    hint: string;
    icon: string;
    isUnlocked: (s: Stats) => boolean;
}

const BADGES: Badge[] = [
    { id: "first-step", label: "First Challenge", hint: "Complete 1 challenge", icon: "★", isUnlocked: (s) => s.completed >= 1 },
    { id: "streak-7", label: "7-Day Streak", hint: "Reach a 7-day streak", icon: "🔥", isUnlocked: (s) => s.streak >= 7 },
    { id: "streak-30", label: "30-Day Streak", hint: "Reach a 30-day streak", icon: "⚡", isUnlocked: (s) => s.streak >= 30 },
    { id: "done-10", label: "10 completed", hint: "Complete 10 challenges", icon: "◆", isUnlocked: (s) => s.completed >= 10 },
    { id: "done-50", label: "50 completed", hint: "Complete 50 challenges", icon: "◈", isUnlocked: (s) => s.completed >= 50},
];

/* ----------- Storage + date helpers ------------ */

const readJSON = <T,>(key: string, fallback: T): T => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
};

const writeJSON = (key: string, value: unknown) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        /* storage unavaible: keep going in memory */
    }
};

// "2026-10-01 parses as UTC by default, which can land on the previous day locally."
const parseLogDate = (s: string): Date | null => {
    const m = /^(\d{4})-(\d{2})/.exec(s);
    const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(s);
    return Number.isNaN(d.getTime()) ? null : d;
}

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

const startOfWeek = (d: Date) => {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); //Monday start
    return x;
}

const formatDay = (d: Date) =>
    d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

const WEEKS = 12;
const PREVIEW_COUNT = 5;

type THEME = "dark" | "light";

/* ----------- Component ------------ */

const Profile: React.FC = () => {
    //States
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [streakCount, setStreakCount] = useState<number>(0);
    const [hoursLogged, setHoursLogged] = useState<number>(0);
    const [weeklyGoal] = useState<number>(5);
    const [weeklyDone, setWeeklyDone] = useState<number>(0);

    //For vercel
    //console.log(hoursLogged + weeklyGoal + weeklyDone);
    //setHoursLogged(0);
    //setWeeklyDone(0);

    //Theme state initilialises from localStorage so user preference persists across sessions. Defaults to dark.
    const [theme, setTheme] = useState<"dark" | "light">(() => {
        return (localStorage.getItem("theme") as "dark" | "light") ?? "dark";
    });

    //User info + edit state
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("John Smith");
    const [bio, setBio] = useState("Athlete");

    //Notifications toggle
    const [notifications, setNotifications] = useState<boolean>(() => {
        return localStorage.getItem("notifications") !== "false";
    });

    //Derive initials from name dynamically
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");
    

    //Logs to LocalStorage future use
    const [logs, setLogs] = useState<TrainingLog[]>(() => {
        const stored = localStorage.getItem("trainingLogs");
        return stored ? JSON.parse(stored) : [];
    })

    const saveLog = (log: TrainingLog) => {
        const updated = [log, ...logs];
        setLogs(updated);
        localStorage.setItem("trainingLogs", JSON.stringify(updated));
    };

    //Suppress unused warning until wired up.
    void saveLog;

    //Apply theme to root element
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme]);

    //Local Storage data
    useEffect(() => {
        const raw = localStorage.getItem("challengeState");
        if (!raw) return;

        try {
            const parsed = JSON.parse(raw) as {
                streakCount?: number;
                completedCount?: number;
            };

            setStreakCount(parsed.streakCount ?? 0);
            setCompletedCount(parsed.completedCount ?? 0);
        } catch (err) {
            console.warn("Failed to parse challengeState", err);
        }
    }, []);

    return(
        <div className="profile-page">
            {/* Back Button */}
            <button className="back-btn" onClick={() => window.history.back()}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                        d="M9 2L4 7L9 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Back
            </button>
            
            <div className="profile-card">

                {/* Hero Section */}
                <div className="hero">
                    <div className="avatar-wrap">
                        <div className="avatar-initials" aria-label={`Avatar for ${name}`}>
                            {initials}
                        </div>
                        <div className="status-dot" title="Active" />
                    </div>
                    <div className="hero-info">
                        <h1 className="hero-name">{name}</h1>
                        <p className="hero-bio">{bio}</p>
                        <p className="hero-tagline">Consistency beats motivation.</p>
                    </div>
                </div>

                {/* Stats Section */}
                <section className="profile-section">
                    <p className="sec-label">Stats</p>
                    <div className="stats-grid">

                        <div className="stat-tile">
                            <div className="stat-icon-row">
                                <div className="dot-icon dot-green" aria-hidden="true">✓</div>
                                <span className="stat-type-label">Completed</span>
                            </div>
                            <p className="stat-num">{completedCount}</p>
                            <p className="stat-meta">challenges done</p>
                        </div>

                        <div className="stat-tile">
                            <div className="stat-icon-row">
                                <div className="dot-icon dot-purple" aria-hidden="true">↑</div>
                                <span className="stat-type-label">Streak</span>
                            </div>
                            <p className="stat-num streak">{streakCount}</p>
                            <p className="stat-meta">
                                {streakCount === 0 ? "Start today" : `${streakCount}-day streak`}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="profile-section">
                    <h2>Training Log</h2>
                    
                    {logs.length === 0 ? (
                        <p className="training-log">
                            No entires yet. Complete challenges to build your journey.
                        </p>
                    ) : (
                        <div className="training-log">
                            {logs.map((log) => (
                                <div key={log.id} className="log-entry">
                                    <div className="log-header">
                                        <span className="log-date">{log.date}</span>
                                        <span className="log-difficulty">
                                            {"●".repeat(log.difficulty)}
                                        </span>
                                    </div>

                                    <p className="log-challenge">{log.challenge}</p>

                                    <div className="log-mood">
                                        <span>{log.moodBefore}</span>
                                        <span className="arrow">→</span>
                                        <span>{log.moodAfter}</span>
                                    </div>

                                    {log.takeaway && (
                                        <p className="log-takeaway">"{log.takeaway}"</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/** Settings Section */}
                <section className="profile-section settings">
                    <p className="sec-label">Settings</p>
                    <div className="settings-row">
                        <div>
                            <p className="settings-label">Dark mode</p>
                            <p className="settings-sub">Toggle appearance</p>
                        </div>

                        <label className="toggle" aria-label="Toggle dark mode">
                            <input
                                type="checkbox"
                                checked={theme === "dark"}
                                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                            />
                            <div className="toggle-track" />
                            <div className="toggle-thumb"/> 
                        </label>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default Profile;