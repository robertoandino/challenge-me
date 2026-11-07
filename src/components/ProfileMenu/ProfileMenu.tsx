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

    return (
        <div className="profile-dropdown">
            hi
        </div>
    );
};

export default ProfileMenu;