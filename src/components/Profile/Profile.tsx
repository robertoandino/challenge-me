import { useMemo, useState, useEffect} from "react";
//import { useLocation } from "react-router-dom";
import "./Profile.css";
//import avatar from "../../assets/avatar.jpg";
//import TrainingLogModal from "../TrainingLogModal/TrainingLogModal";
import { TrainingLog } from '../../types/TrainingLog.ts';
import {
    KEYS,
    calcStreak,
    dateKey,
    loadChallengeState,
    loadTheme,
    readJSON,
    saveTheme,
    writeJSON,
    type Theme,
} from "../../utils/storage";


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

/* Storage + date helpers */

// "2026-10-01 parses as UTC by default, which can land on the previous day locally."
const parseLogDate = (s: string): Date | null => {
    const m = /^(\d{4})-(\d{2})/.exec(s);
    const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(s);
    return Number.isNaN(d.getTime()) ? null : d;
}

const startOfWeek = (d: Date) => {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); //Monday start
    return x;
}

const formatDay = (d: Date) =>
    d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

const WEEKS = 12;
const PREVIEW_COUNT = 5;

function Profile() {
    const [theme, setTheme] = useState<Theme>(loadTheme);

    const [profile, setProfile] = useState(() =>
        readJSON("profile", { name: "John Smith", bio: "Athlete" })
    );
    const [isEditing, setIsEditing] = useState(false)
    const [draft, setDraft] = useState(profile);

    const [weeklyGoal, setWeeklyGoal] = useState<number>(() => readJSON("weeklyGoal", 5));
    const [showAll, setShowAll] = useState(false);

    //Read once on mount: Home writes challengeState. The streak is derived from completed dates.
    const [challengeState] = useState(loadChallengeState);
    const completedDates = useMemo(() => new Set(challengeState.completedDates), [challengeState]);
    const stats: Stats = useMemo(
        () => ({ streak: calcStreak(completedDates), completed: challengeState.completedCount }),
        [completedDates, challengeState]
    );


    const [logs] = useState<TrainingLog[]>(() => {
        const stored = readJSON<TrainingLog[]>(KEYS.trainingLogs, []);
        return Array.isArray(stored) ? stored : [];
    })

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        saveTheme(theme);
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
            return { date, count: counts.get(dateKey(date)) ?? 0, future: date > today };
        });

        const weeklyDone = cells.slice(-7).reduce((n, c) => n + c.count, 0);
        return { cells, weeklyDone };
    }, [logs]);

    const activeDays = cells.filter((c) => c.count > 0).length;
    const weeklyPct = Math.min(100, Math.round((weeklyDone / weeklyGoal) * 100));
    const unlockedCount = BADGES.filter((b) => b.isUnlocked(stats)).length;

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
        setDraft(profile);
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

                {/* Identity */}
                <section className="pf-hero">
                    <div className="pf-avatar" aria-hidden="true">{initials}</div>
                    
                    {isEditing ? (
                        <form
                            className="pf-edit"
                            onSubmit={saveProfile}
                            onKeyDown={(e) => e.key === "Escape" && setIsEditing(false)}
                        >
                            <input 
                                className="pf-input pf-input-name"
                                value={draft.name}
                                maxLength={40}
                                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                                aria-label="Name"
                                placeholder="Your name"
                                autoFocus
                            />
                            <input
                                className="pf-input"
                                value={draft.bio}
                                maxLength={80}
                                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                                aria-label="Bio"
                                placeholder="A line about you"
                            />
                            <div className="pf-edit-actions">
                                <button type="submit" className="pf-btn pf-btn-primary" disabled={!draft.name.trim()}>
                                    Save changes
                                </button>
                                <button type="button" className="pf-btn" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="pf-hero-info">
                            <h1 className="pf-name">{profile.name}</h1>
                            <p className="pf-bio">{profile.bio}</p>
                            <button className="pf-link" onClick={startEdit}>Edit profile</button>
                        </div>
                    )}
                </section>

                {/* Streak + Heatmap */}
                <section className="pf-streak" aria-labelledby="pf-streak-title">
                    <div className="pf-streak-head">
                        <h2 id="pf-streak-title" className="pf-streak-num">
                            {stats.streak}
                            <span className="pf-streak-unit">{stats.streak === 1 ? " day" : " days"} in a row</span>
                        </h2>
                        <p className="pf-muted">
                            {stats.streak === 0
                                ? "Complete a challenge today to start a streak"
                                : "Consistency beats motivation"}
                        </p>
                    </div>

                    <div
                        className="pf-heatmap"
                        role="img"
                        aria-label={`Activity over the last ${WEEKS} weeks: ${activeDays} active days`}
                    >
                        {cells.map((c) => (
                            <span
                                key={c.date.toISOString()}
                                className={`pf-cell lv${Math.min(c.count, 3)}${c.future ? " future" : ""}`}
                                title={`${formatDay(c.date)}: ${c.count} ${c.count === 1 ? "challenge" : "challenges"}`}
                            />
                        ))}
                    </div>

                    <div className="pf-legend" aria-hidden="true">
                        <span>Less</span>
                        <span className="pf-cell 1v0" />
                        <span className="pf-cell 1v1" />
                        <span className="pf-cell 1v2" />
                        <span className="pf-cell 1v3" />
                    </div>
                </section>

                {/* Numbers */}
                <section className="pf-numbers">
                    <div>
                        <p className="pf-big">{stats.completed}</p>
                        <p className="pf-muted">challenges completed</p>
                    </div>
                    <div>
                        <p className="pf-big">{activeDays}</p>
                        <p className="pf-muted">active days, last {WEEKS} weeks</p>
                    </div>
                    <div className="pf-goal">
                        <div className="pf-goal-row">
                            <p className="pf-big">
                                {weeklyDone}<span className="pf-goal-of">/{weeklyGoal}</span>
                            </p>
                            <div className="pf-stepper" role="group" aria-label="Weekly goal">
                                <button onClick={() => changeGoal(-1)} aria-label="Lower weekly goal" disabled={weeklyGoal <= 1}>
                                    -
                                </button>
                                <button onClick={() => changeGoal(1)} aria-label="Raise weekly goal" disabled={weeklyGoal >= 14}> 
                                    +
                                </button>
                            </div>
                        </div>
                        <div
                            className="pf-bar"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={weeklyGoal}
                            aria-valuenow={Math.min(weeklyDone, weeklyGoal)}
                            aria-label="Weekly goal progress"
                        >
                            <div className="pf-bar-fill" style={{ width: `${weeklyPct}%`}} />
                        </div>
                        <p className="pf-muted">this week's goal</p>
                    </div>
                </section>

                {/* Badges */}
                <section aria-labelledby="pf-badges-title">
                    <h2 id="pf-badges-title" className="pf-h2">
                        Badges <span className="pf-muted">{unlockedCount} of {BADGES.length}</span>
                    </h2>
                    <ul className="pf-badges"> 
                        {BADGES.map((b) => {
                            const unlocked = b.isUnlocked(stats);
                            return (
                                <li key={b.id} className={`pf-badge${unlocked ? "on" : ""}`} >
                                    <span className="pf-badge-icon">{b.icon}</span>
                                    <span className="pf-badge-text">
                                        <span className="pf-badge-label">{b.label}</span>
                                        {!unlocked && <span className="pf-badge-hint">{b.hint}</span>}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                {/* Training log */}
                <section aria-labelledby="pf-log-title">
                    <h2 id="pf-log-title" className="pf-h2">Training log</h2>

                    {logs.length === 0 ? (
                        <p className="pf-empty">
                            No entries yet. Finish a challenge and log it to start your history
                        </p>
                    ) : (
                        <>
                            <ol className="pf-log">
                                {visibleLogs.map((log) => (
                                    <li key={log.id} className="pf-entry">
                                        <div className="pf-entry-top">
                                            <time className="pf-muted">{log.date}</time>
                                            <span className="pf-dots" aria-label={`Difficulty ${log.difficulty}`}>
                                                {"●".repeat(Math.max(0, Math.min(10, log.difficulty)))}
                                            </span>
                                        </div>
                                        <p className="pf-entry-title">{log.challenge}</p>
                                        <p className="pf-mood">
                                            <span>{log.moodBefore}</span>
                                            <span aria-label="to">→</span>
                                            <span>{log.moodAfter}</span>
                                        </p>
                                        {log.takeaway && <p className="pf-takeaway">"{log.takeaway}"</p>}
                                    </li>
                                ))}
                            </ol>
                            
                            {logs.length > PREVIEW_COUNT && (
                                <button className="pf-link" onClick={() => setShowAll((v) => !v)}>
                                    {showAll ? "Show fewer" : `Show all ${logs.length} entries`}
                                </button>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Profile;