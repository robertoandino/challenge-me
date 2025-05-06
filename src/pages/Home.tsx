import React, { useState } from "react";
import { challenges } from "../data/challenges";
import "./Home.css";

const Home: React.FC = () => {
    const [currentChallenge, setCurrentChallenge] = useState<string>("Click the button to receieve a challenge!");

    const generateChallenge = () => {
        const randomIndex = Math.floor(Math.random() *  challenges.length);
        setCurrentChallenge(challenges[randomIndex]);
    };


    return (
        <main className="main-container">
            <div className="content-wrapper">
                {/*Header*/}
                <div className="header">
                    <h1 className="title">
                        Challenge me
                    </h1>
                    <p className="subtitle">
                        Get a random mental or physical challenge to energize your day.
                    </p>
                </div>

                {/*Challenge Box (placeholder)*/}
                <div className="challenge-box">
                    <p className="challenge-text">
                        {currentChallenge}
                    </p>
                </div>

                {/*Button*/}
                <button 
                    onClick={generateChallenge}
                    className="generate-button"
                    aria-label="Generate a new random challenge"    
                >
                    Generate Challenge
                </button>
            </div>
        </main>
    );
};

export default Home;