import React from "react";
import ProfileMenu from ".ProfileMenu";

interface HeaderProps {
    dailyChallenge: string;
    completeCount: number;
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
        </header>
    )
}