import React, { useState } from "react";
import { challenges } from "../data/challenges";
import { ChallengeCategory } from "../data/Challenge";
import "./Home.css";

const Home: React.FC = () => {
    // State to manage the current challenge
    const [currentChallenge, setCurrentChallenge] = useState<string>("Click the button to receieve a challenge!");
    // State to manage the loading state
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    // Challenge history state
    const [challengeHistory, setChallengeHistory] = useState<string[]>([]);
    //const [showHistory, setShowHistory] = useState(false);
    // State to manage Category and difficulty
    const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | 'all'>('all');
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [streakCount, setStreakCount] = useState<number>(0);

    console.log(challenges);

    const generateChallenge = () => {
        setIsGenerating(true);

        setTimeout(() => {
            const filteredChallenges = challenges.filter(challenge => 
                (selectedCategory === 'all' || challenge.category === selectedCategory) &&
                challenge.difficulty === difficulty
            );

            const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
            const newChallenge = filteredChallenges[randomIndex];
            setCurrentChallenge(newChallenge.text);
            setChallengeHistory(prev => [newChallenge.text, ...prev].slice(0, 5));
            setStreakCount(prev => prev + 1);
            setIsGenerating(false);
            setHasGenerated(true);
        }, 500);
    };

    console.log(challengeHistory);
    
    return (
        <main className="main-container">
            {/*Main Header*/}
            <header className="site-header">
                <h1 className="main-title">Challenge me</h1>
                <p className="subtitle">Get a random mental or physical challenge to energize your day.</p>
            </header>

            {/* Main Content Area */}
            <div className="page-content">  
                {/* Controls Section */}
                <section className="controls-wrapper">
                    <div className="controls-section">
                        <div className="controls-header">
                            <h2>Customize Your Challenge</h2>
                            {streakCount > 0 && (
                                <div className="streak-count">
                                    🔥 Streak: {streakCount}
                                </div>
                            )}
                        </div>

                        <div className="controls-grid">  
                            <div className="category-controls">
                                <h3>Choose Category</h3>
                                <div className="category-buttons">
                                    {['all', 'physical', 'mental', 'creative', 'social'].map(category => (
                                        <button
                                            key={category}
                                            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory(category as ChallengeCategory | 'all')}
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                    
                            <div className="difficulty-selector">
                                <h3>Difficulty:</h3>
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="difficulty-select"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                        </div>   
                    </div>                    
                </section>
    
                {/* Challenge Display Section */}
                <section className="challenge-section">
                    <div className={`challenge-containr ${hasGenerated ? 'has-generated' : ''}`}>
                        <div className={`challenge-box ${hasGenerated ? 'challenge-box-generated' : ''}`}>
                            {isGenerating ? (
                                <div className="loadin-state">
                                    <div className="loading-spinner"></div>
                                    <p>Generating your challenge...</p>
                                </div>
                            ) : (
                                <p className="challenge-text">{currentChallenge}</p>
                            )}
                        </div>
                    </div>

                    <div className="button-group">
                        <button
                            onClick={generateChallenge}
                            className={`primary-button ${isGenerating ? 'generating' : ''}`}
                            disabled={isGenerating}
                        >
                            {isGenerating ? 'Generating...' : 'Generate Challenge'}
                        </button>

                        {hasGenerated && (
                            <button
                                onClick={() => navigator.clipboard.writeText(currentChallenge)}
                                className="secondary-button"
                                title="Copy to clipboard"
                            >
                                <span>Copy Challenge</span>
                            </button>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;