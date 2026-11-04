import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./Header.css";

interface HeaderProps {
    dailyChallenge: string;
    completedCount: number;
    currentChallenge: string;
    profileOpen: boolean;
    setProfileOpen: Dispatch<SetStateAction<boolean>>;
}

function Header({
    dailyChallenge,
    completedCount,
    currentChallenge,
    profileOpen,
    setProfileOpen,
}: HeaderProps) {
    return (
        <div>
            hi
        </div>
    )
}

export default Header;