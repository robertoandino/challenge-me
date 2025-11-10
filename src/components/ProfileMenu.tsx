import React from "react";

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
    return (
        <div className="profile-dropdown">
            <h4>User Info</h4>
            <div><strong>Daily Challenge:</strong> {dailyChallenge}</div>
            <div><strong>Challenges Completed:</strong> {completedCount}</div>
            <div><strong>Current Challenge:</strong> {currentChallenge}</div>
        </div>
    );
};

export default ProfileMenu;