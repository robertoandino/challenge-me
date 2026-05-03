import React, {useState, useEffect} from "react";
//import { useLocation } from "react-router-dom";
import "./Profile.css";
//import avatar from "../../assets/avatar.jpg";
//import TrainingLogModal from "../TrainingLogModal/TrainingLogModal";
import { TrainingLog } from '../../types/TrainingLog.ts';

const Profile: React.FC = () => {
    //States
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [streakCount, setStreakCount] = useState<number>(0);
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    //User info state Hardcoded
    const name = "John Smith"; 
    const bio = "Athlete"; 

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
                        <div className="avatar-initials" aria-lavel={`Avatar for ${name}`}>
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
                    <h2>Stats</h2>
                    <div className="profile-stats">
                    <div className="profile-stat-card">
                        <span className="stat-icon">✅</span>
                        <div className="stat-info">
                            <p className="stat-value">{completedCount}</p>
                            <p className="stat-label">Completed Challenges</p>
                        </div>
                    </div>

                    <div className="profile-stat-card">
                        <span className="stat-icon">🔥</span>
                        <div className="stat-info">
                            <p className="stat-value">{streakCount}</p>
                            <p className="stat-label">
                                {streakCount === 0
                                    ? "Start today"
                                    : `${streakCount}-day streak`
                                }
                            </p>
                        </div>
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
                                        <p className="log-takeway">"{log.takeaway}"</p>
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