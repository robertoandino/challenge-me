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
    const name = "John Smith"; 
    const bio = "Athlete";

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
                </div>

                <section className="profile-section">
                    <h2>User Info</h2>
                    <p>{name}</p>
                    <p>{bio}</p>
                </section>

                <section className="profile-section">
                    <div className="profile-stat-card">
                        <span className="stat-icon">✅</span>
                        <div>
                            <p className="stat-value">{completedCount}</p>
                            <p className="stat-label">Completed</p>
                        </div>
                    </div>

                    <div className="profile-stat-card">
                        <span className="stat-icon">🔥</span>
                        <div>
                            <p className="stat-value">{streakCount}</p>
                            <p className="stat-label">Streak</p>
                        </div>
                    </div>
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