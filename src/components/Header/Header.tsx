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
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the menu on outside click or Escape.
    useEffect(() => {
        if (!profileOpen) return;

        const onPointerDown = (e: PointerEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) setProfileOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setProfileOpen(false);
        };
    

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [profileOpen, setProfileOpen]);

    return (
        <div>
            hi
        </div>
    )
}

export default Header;