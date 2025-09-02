import React, { useState, useEffect } from "react";
import { challenges } from "../data/challenges";
import { ChallengeCategory } from "../data/Challenge";
import "./Home.css";
import "./responsive.css";

const Home: React.FC = () => {
    // State to manage the current challenge
    const [currentChallenge, setCurrentChallenge] = useState<string>("Click the button to receieve a challenge!");
    // State to manage the loading state
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    // Challenge history state
    //const [challengeHistory, setChallengeHistory] = useState<string[]>([]);
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
    //const [showHistory, setShowHistory] = useState(false);
    // State to manage Category and difficulty
    const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | 'all'>('all');
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [streakCount, setStreakCount] = useState<number>(0);
    // State to manage daily challenge
    const [dailyChallenge, setDailyChallenge] = useState<string>("");
    // State to manage profile menu visibility
    const [profileOpen, setProfileOpen] = useState(false);


    const generateChallenge = () => {
        setIsGenerating(true);

        setTimeout(() => {
            const filteredChallenges = challenges.filter(challenge => 
                (selectedCategory === 'all' || challenge.category === selectedCategory) &&
                challenge.difficulty === difficulty
            );

            //Check if there are any challenges available
            if (filteredChallenges.length === 0) {
                setCurrentChallenge("No challenges found for selected category and difficulty!");
                setIsGenerating(false);
                return;
            }
            
            const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
            const newChallenge = filteredChallenges[randomIndex];

            setCurrentChallenge(newChallenge.text);
            //setChallengeHistory(prev => [newChallenge.text, ...prev].slice(0, 5));
            setStreakCount(prev => prev + 1);
            setIsGenerating(false);
            setHasGenerated(true);
        }, 500);
    };

    function getDailyChallenge() {
        const today = new Date();
        //date as a string in YYYY-MM-DD format
        const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1)
        const index = daySeed % challenges.length;
        return challenges[index];
    }

    //Daily challenge effect
    useEffect(() => {
        setDailyChallenge(getDailyChallenge().text);
    }, [])

    return (
        <main className="main-container">
            {/*Main Header*/}
            <header className="site-header">
                <div className="header-left">
                    <h1 className="main-title">Challenge Me</h1>
                    <p className="subtitle">Get a random mental or physical challenge to energize your day.</p>
                </div>
                <div className="profile-menu-container">
                    <button
                        className="profile-button"
                        onClick={() => setProfileOpen((open) => !open)}
                    >
                        <span role="img" aria-label="profile">👤</span>
                    </button>
                    {profileOpen && (
                        <div className="profile-dropdown">
                            <h4>User Info</h4>
                            <div><strong>Daily Challenge:</strong> {dailyChallenge} </div>
                            <div><strong>Challenges Completed:</strong> {completedCount}</div>
                            <div><strong>Current Challenge:</strong> {currentChallenge}</div>
                        </div>
                    )}
                </div>
            </header>

            {/* Stats Cards */}
            <section className="stats-cards">
                <div>
                    
                </div>
            </section>
            {/* Main Content Area */}

            {/* Right Column */}
            <div className="page-content">
                <aside className="right-column">
                    {/* Controls Section */}
                    <section className="section-card controls-wrapper">
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
                
                    {/* Daily Challenge Section */}
                    <section className="section-card daily-challenge-section">
                        <h2>🌞 Daily Challenge</h2>
                        <div className="daily-challenge-box">
                            <p>{dailyChallenge}</p>
                        </div>
                    </section>
                    </aside>  

                {/* Left Column */}
                <main className="left-column">
                    {/* Challenge Display Section */}
                    <section className="section-card challenge-section">
                        <div className={`challenge-container ${hasGenerated ? 'has-generated' : ''}`}>
                            <div className={`challenge-box ${hasGenerated ? 'challenge-box-generated' : ''}`}>
                                {isGenerating ? (
                                    <div className="loading-state">
                                        <div className="loading-spinner"></div>
                                        <p>Generating your challenge...</p>
                                    </div>
                                ) : (
                                    <p className="challenge-text">{currentChallenge}</p>
                                )}
                            </div>
                        </div>

                        {/* Progress tracker */}
                        <div className="progress-info">
                            <span>Challenges completed: {completedCount}</span>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${Math.min((completedCount / 20) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    
                        {/* Mark as Completed Button */}
                        {hasGenerated && (
                            <button
                                className="complete-button"
                                onClick={() => {
                                    setCompletedCount(prev => prev + 1);
                                    setCompletedChallenges(prev => 
                                        prev.includes(currentChallenge) ? prev : [currentChallenge, ...prev]
                                    );
                                }}
                            >
                                Mark as Completed
                            </button>
                        )}

                        {/* Challenges list */}
                        {completedChallenges.length > 0 && (
                            <div className="completed-list">
                                <h4>Completed Challenges</h4>
                                <ul>
                                    {completedChallenges.map((challenge, idx) => (
                                        <li key={idx}>
                                            <span role="img" aria-label="completed" style={{marginRight: '0.5rem'}}>✅</span>
                                            {challenge}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>

                    {/* Generate/Copy Buttons */}        
                    <div className="section-card button-group">
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
                </main>
            </div>
        </main>
    );
};

export default Home;