import React, { useState } from "react";
import { challenges } from "../data/challenges";
import { ChallengeCategory } from "../data/ChallengeCategory";
import "./Home.css";

const Home: React.FC = () => {
    // State to manage the current challenge
    const [currentChallenge, setCurrentChallenge] = useState<string>("Click the button to receieve a challenge!");
    // State to manage the loading state
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    // Challenge history state
    const [challengeHistory, setChallengeHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    // State to manage Category and difficulty
    const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | 'all'>('all');
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [streakCount, setStreakCount] = useState<number>(0);

    const generateChallenge = () => {
        setIsGenerating(true);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * challenges.length);
            const newChallenge = challenges[randomIndex];
            setCurrentChallenge(newChallenge);
            setChallengeHistory(prev => [newChallenge, ...prev].slice(0, 5));
            setIsGenerating(false);
            setHasGenerated(true);
        }, 500);
    };

    console.log("Challenge History:", challengeHistory);

    return (
        <main className="main-container">
            <nav className="nav-bar">
                <div className="nav-content">
                    <h2 className="nav-title">Challenge me</h2>
                    <button
                        className="history-button"
                        onClick={() => setShowHistory(!showHistory)}
                    >
                        {showHistory ? 'Hide History' : 'Show History'}
                    </button>
                </div>
            </nav>

            <div className="content-wrapper">
                {/*Header*/}
                <div className="header">
                    <h1 className="title">Challenge me</h1>
                    <p className="subtitle">Get a random mental or physical challenge to energize your day.</p>
                </div>

                {/*Challenge Box*/}
                <div className={`challenge-box ${hasGenerated ? 'challenge-box-generated' : ''}`}>
                    <p className={`challenge-text ${isGenerating ? 'loading' : ''}`}>
                        {isGenerating ? 'Generating challenge...' : currentChallenge}
                    </p>
                </div>

                {/*Button*/}
                <button 
                    onClick={generateChallenge}
                    className={`generate-button ${isGenerating ? 'generating' : ''}`}
                    disabled={isGenerating}
                    aria-label="Generate a new random challenge"    
                >
                    {isGenerating ? 'Generating...' : 'Generate Challenge'}
                </button>

                {hasGenerated && (
                    <button
                        onClick={() => navigator.clipboard.writeText(currentChallenge)}
                        className="share-button"
                        aria-label="Share this challenge"
                    >
                        Copy Challenge
                    </button>
                )}
            </div>
        </main>
    );
};

export default Home;