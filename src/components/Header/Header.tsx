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
        <header className="site-header">
            <div className="header-left">
                <div className="logo">⚡</div>
                <h1 className="main-title">Challenge</h1>
            </div>

            <div className="profile-menu-container" ref={menuRef}>
                <button
                    type="button"
                    className="profile-button"
                    onClick={() => setProfileOpen((open) => !open)}
                    aria-label="Profile menu"
                    aria-expanded={profileOpen}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
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
    )
}

export default Header;