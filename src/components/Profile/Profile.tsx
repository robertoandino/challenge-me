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

type Theme = "dark" | "light";

/* ----------- Component ------------ */

/*const Profile: React.FC = () => {
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
            {/* Back Button */
            /*
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

                {/* Hero Section */
               /*
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

                {/* Stats Section */
                /*
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

                {/** Settings Section */
               /*
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
/*}*/

function Profile() {
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            return localStorage.getItem("theme") === "light" ? "light" : "dark";
        } catch {
            return "dark";
        }
    });

    const [profile, setProfile] = useState(() =>
        readJSON("profile", { name: "John Smith", bio: "Athlete" })
    );
    const [isEditing, setIsEditing] = useState(false)
    const [draft, setdraft] = useState(profile);

    const [weeklyGoal, setWeeklyGoal] = useState<number>(() => readJSON("weeklyGoal", 5));
    const [showAll, setShowAll] = useState(false);

    //Read once on mount: challengeState is written elsewhere in the app.
    const [stats] = useState<Stats>(() => {
        const s = readJSON<{ streakCount?: number; completedCount?: number }>("challengeState", {});
        return { streak: s.streakCount ?? 0, completed: s.completedCount ?? 0 };
    })

    const [logs] = useState<TrainingLog[]>(() => {
        const stored = readJSON<TrainingLog[]>("trainingLogs", []);
        return Array.isArray(stored) ? stored : [];
    })

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            localStorage.setItem("theme", theme)
        } catch {
            /* ignore */
        }
    }, [theme]);

    /* Heatmap cells (last 12 weeks, Monday-first) + this week's count */
    const { cells, weeklyDone } = useMemo(() => {
        const counts = new Map<string, number>();
        for (const log of logs) {
            const d = parseLogDate(log.date);
            if (d) counts.set(dayKey(d), (counts.get(dayKey(d)) ?? 0) + 1);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = startOfWeek(today);
        start.setDate(start.getDate() - 7 * (WEEKS - 1));

        const cells = Array.from({ length: WEEKS * 7 }, (_, i) => {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            return { date, count: counts.get(dayKey(date)) ?? 0, future: date > today };
        });

        const weeklyDone = cells.slice(-7).reduce((n, c) => n + c.count, 0);
        return { cells, weeklyDone };
    }, [logs]);

    const activeDays = cells.filter((c) => c.count > 0).length;
    const weeklyPct = Math.min(100, Math.round((weeklyDone / weeklyGoal) * 100));
    const UnlockedCount = BADGES.filter((b) => b.isUnlocked(stats)).length;

    const initials =
        profile.name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((n) => n[0])
            .join("")
            .toUpperCase() || "?";

    const visibleLogs = showAll ? logs : logs.slice(0, PREVIEW_COUNT);

    const startEdit = () => {
        setdraft(profile);
        setIsEditing(true);
    };

    const saveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const next = { name: draft.name.trim(), bio: draft.bio.trim() };
        if (!next.name) return;
        setProfile(next);
        writeJSON("profile", next);
        setIsEditing(false);
    };

    const changeGoal = (delta: number) => {
        const next = Math.max(1, Math.min(14, weeklyGoal + delta));
        setWeeklyGoal(next);
        writeJSON("weeklyGoal", next);
    };

    return (
        <div className="pf-page">
            <div className="pf-shell">
                {/* Top bar */}
                <header className="pf-topbar">
                    <button className="pf-btn" onClick={() => window.history.back()}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Back
                    </button>

                    <button
                        className="pf-btn pf-btn-icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2M12 20v2M4.9 4.911.4 1.4M17.7 17.711.4 1.4M2 12h2M20 12h2M4 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                            </svg>
                        )}
                    </button>
                </header>
            </div>
        </div>
    )
}

export default Profile;