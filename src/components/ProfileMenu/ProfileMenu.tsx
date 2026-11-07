import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { KEYS, loadTheme, readJSON, saveTheme, type Theme } from "../../utils/storage";
import "./ProfileMenu.css"

interface ProfileMenuProps {
    dailyChallenge: string;
    completedCount: number;
    streakCount: number;
    onUseDaily: () => void;
    onClose: () => void;
    currentChallenge: string;
};

const initialsOf = (name: string) =>
    name
        .split("")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "?";

function ProfileMenu({ dailyChallenge, completedCount, streakCount, onUseDaily, onClose}: 
    ProfileMenuProps) {
    const navigate = useNavigate();

    //same saved profile the Profile page edits.
    const [profile] = useState(() => readJSON(KEYS.profile, { name: "John Smith", bio: "Athlete"}));
    const [theme, setTheme] = useState<Theme>(loadTheme);

    const toggleTheme = () => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        saveTheme(next);
    }

    const useDaily = () => {
        onUseDaily();
        onClose();
    }

    return (
        <div className="profile-dropdown">
            <div className="pm-who">
                <div className="pm-avatar" aria-hidden="true">{initialsOf(profile.name)}</div>
            
                <div className="pm-who-text">
                    <p className="pm-name">{profile.name}</p>
                    {profile.bio && <p className="pm-bio">{profile.bio}</p>}
                </div>
            </div>

            <div className="pm-stats">
                <div className="pm-stat">
                    <span className="pm-stat-num">{streakCount}</span>
                    <span className="pm-stat-label">day streak</span>
                </div>
                <div className="pm-stat">
                    <span className="pm-stat-num">{completedCount}</span>
                    <span className="pm-stat-label">completed</span>
                </div>
            </div>

            {dailyChallenge && (
                <div className="pm-daily">
                    <p className="pm-label">Today's challenge</p>
                    <p className="pm-daily-text">{dailyChallenge}</p>
                    <button type="button" className="pm-daily-btn" onClick={useDaily}>
                        Do this one
                    </button>
                </div>   
            )}

            
        </div>
    );
};

export default ProfileMenu;