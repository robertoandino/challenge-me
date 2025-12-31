import React from "react";


const Profile: React.FC = () => {
    return(
        <div className="profile-page">
            <button className="back-button" onClick={() => window.history.back()}>← Back</button>
            <div className="profile-header">
                <img src="/assets/avatar.png" alt="avatar" className="avatar"/>
                <h1>Profile</h1>
            </div>
            <div className="profile-sections">
                <section className="user-info">
                    <h2>User Info</h2>
                </section>
                <section className="stats">
                    <h2>Stats</h2>
                </section>
                <section className="settings">
                    <h2>Settings</h2>
                </section>
            </div>
        </div>
    );
}
export default Profile;