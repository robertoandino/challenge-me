import React from "react";
import { useState } from "react";

interface ProfileMenuProps {
    dailyChallenge: string;
    completedCount: number;
    currentChallenge: string;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({
    dailyChallenge,
    completedCount,
    currentChallenge,
}) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

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
                        <p>Cuztomise your avatar, name, etc. (Coming soon)</p>
                    </div>
                )}

                <button className="menu-item" onClick={() => toggleSection("stats")}>
                    <span>📊</span> Stats
                    <span className="arrow">{activeSection === "stats" ? "▲" : "▼"}</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileMenu;