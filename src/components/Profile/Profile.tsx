import React, {useState, useEffect} from "react";
//import { useLocation } from "react-router-dom";
import "./Profile.css";
import avatar from "../../assets/avatar.jpg";
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
            <button className="back-button" onClick={() => window.history.back()}>← Back</button>
            
            <div className="profile-card">
                <div className="profile-header">
                    <img src={avatar} alt="avatar" className="avatar"/>
                    <p className="profile-tagline">Consistency beats motivation.</p>
                </div>

                <section className="profile-section">
                    <h2>User Info</h2>
                    <p>{name}</p>
                    <p>{bio}</p>
                </section>

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
                    <h2>Settings</h2>
                    <label>
                        Theme:
                        <select
                            value={theme}
                            onChange={() => setTheme("dark")}
                            className="profile-select"
                        >
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                    </label>
                </section>

            </div>
        </div>
    );
}
export default Profile;