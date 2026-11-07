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

    return (
        <div className="profile-dropdown">
            hi
        </div>
    );
};

export default ProfileMenu;