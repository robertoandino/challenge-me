import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";
import avatar from "../../assets/avatar.jpg";

const Profile: React.FC = () => {
    const location = useLocation();
    //const navigate = useNavigate();

    //Data from home component
    const { completedCount = 0, streakCount = 0 } = location.state || {};

    //User info state Hardcoded
    const name = "Your name"; 
    const bio = "Tell us about yourself";

    //future use
    const [theme, setTheme] = useState('dark'); 

    console.log(completedCount + streakCount);

    const handleSave = () => {
        //Save localStorage or state (for now, just log)
        localStorage.setItem('userProfile', JSON.stringify({ name, bio, theme }));
        alert('Profile saved!');
    }

    return(
        <div className="profile-page">
            <button className="back-button" onClick={() => window.history.back()}>← Back</button>
            
            <div className="profile-card">
                <div className="profile-header">
                    <img src={avatar} alt="avatar" className="avatar"/>
                    <h1>Profile</h1>
                </div>

                <section className="profile-section">
                    <h2>User Info</h2>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Bio:</strong> {bio}</p>
                </section>

                <section className="profile-section">
                    <h2>Stats</h2>
                    <p>Completed Challenges: {completedCount}</p>
                    <p>Current Streak: {streakCount}</p>
                </section>

                <section className="profile-section">
                    <h2>Settings</h2>
                    <label>
                        Theme:
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="profile-select"
                        >
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                    </label>
                </section>

                <button className="save-button" onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
}
export default Profile;