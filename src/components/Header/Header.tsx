import React from "react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./Header.css";

interface HeaderProps {
    dailyChallenge: string;
    completedCount: number;
    currentChallenge: string;
    profileOpen: boolean;
    setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
    dailyChallenge,
    completedCount,
    currentChallenge,
    profileOpen,
    setProfileOpen,
}) => {
    return (
        <header className="site-header">
            <div className="header-left">
                <h1 className="main-title">Challenge Me</h1>
                <p className="subtitle">
                    Get a random mental or physical challenge to energize your day!
                </p>            
            </div>

            <div className="profile-menu-container">
                <button
                    className="profile-button"
                    onClick={() => setProfileOpen((open) => !open)}
                >
                    <span role="img" aria-label="profile">👤</span>
                </button>

                {profileOpen && (
                    <ProfileMenu
                        dailyChallenge={dailyChallenge}
                        completedCount={completedCount}
                        currentChallenge={currentChallenge}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;