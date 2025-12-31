import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //Data from home component
    const { completedCount = 0, streakCount = 0 } = location.state || {};

    //User info state
    const [name, setName] = useState('Your Name');
    const [bio, setBio] = useState('Tell us about yourself!');
    const [theme, setTheme] = useState('dark'); //future use

    console.log(completedCount + streakCount);

    const handleSave = () => {
        //Save localStorage or state (for now, just log)
        localStorage.setItem('userProfile', JSON.stringify({ name, bio, theme }));
        alert('Profile saved!');
    }

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