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

const ProfileMenu: React.FC<ProfileMenuProps> = ({
    dailyChallenge,
    completedCount,
    currentChallenge,
}) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const navigate = useNavigate();

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    }

    console.log({ dailyChallenge, completedCount, currentChallenge });

    return (
        <div className="profile-dropdown">
            <div className="menu-list">
                <button className="menu-item" onClick={() => toggleSection("profile")}>
                    <span>👤</span> Profile
                    <span className="arrow">{activeSection === "profile" ? "▲" : "▼"}</span>
                </button>
                {activeSection === "profile" && (
                    <div className="submenu">
                        <div>John Smith</div>
                        <div>Athlete</div>
                        <div className="bio" onClick={() => navigate('/profile')}>Blog</div>
                    </div>
                )}
                <button className="menu-item" onClick={() => toggleSection("stats")}>
                    <span>📊</span> Stats
                    <span className="arrow">{activeSection === "stats" ? "▲" : "▼"}</span>
                </button>
                {activeSection === "stats" && (
                    <div className="submenu">
                        <div>Completed: {completedCount}</div>
                        <div>Daily: {dailyChallenge}</div>
                    </div>
                )}

                <button className="menu-item" onClick={() => toggleSection("challenges")}>
                    <span>🎯</span> Challenges
                    <span className="arrow">{activeSection === "challenges" ? "▲" : "▼"}</span>
                </button>
                {activeSection === "challenges" && (
                    <div className="submenu">
                        <div> current: {currentChallenge}</div>
                        <p>Manage challenges (Coming soon)</p>
                    </div>
                )}

                <button className="menu-item" onClick={() => toggleSection("settings")}>
                    <span>⚙️</span> Settings
                    <span className="arrow">{activeSection === "settings" ? "▲" : "▼"}</span>
                </button>
                {activeSection === "settings" && (
                    <div className = "submenu">
                        <p>Theme, notifications, etc. (Coming soon)</p>
                    </div>
                )}


            </div>
        </div>
    );
};

export default ProfileMenu;