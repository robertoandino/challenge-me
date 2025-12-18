import React, { useState, useEffect } from "react";
import { challenges } from "../data/challenges";
import { ChallengeCategory } from "../data/Challenge";
import "./Home.css";
import "./responsive.css";
import Header from "../components/Header/Header";
import StatCard from "../components/StatCard/StatCard";
import ChallengeBox from "../components/ChallengeBox/ChallengeBox";
import DifficultySelector from "../components/DifficultySelector/DifficultySelector";
import ButtonGroup from "../components/ButtonGroup/ButtonGroup";
import CategorySelector from "../components/CategorySelector/CategorySelector";
//import ChallengeCard from "../components/ChallengeCard";
import DailyChallengeCard from "../components/DailyChallengeCard/DailyChallengeCard";
//import profileMenu from "../components/ProfileMenu";
//import ProgressRing from "../components/ProgressRing/ProgressRing";


const Home: React.FC = () => {
    // State to manage the current challenge
    const [currentChallenge, setCurrentChallenge] = useState<string>("Click the button to receieve a challenge!");
    
    // State to manage the loading state
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    
    // Challenge history state
    //const [challengeHistory, setChallengeHistory] = useState<string[]>([]);
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [completedDatesSet, setCompletedDatesSet] = useState<Set<string>>(new Set())
    //const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
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

    //Progress Ring / Heat map
    //Helper function
    {/*function isoToday() {
        return new Date().toISOString().slice(0, 10);
    }*/}

    //load persisted state once
    useEffect(() => {
        try {
            const raw = localStorage.getItem("challengeData");
            if (raw) {
                const parsed = JSON.parse(raw);
                setCompletedCount(parsed.completedCount || 0);
                const dates: string[] = parsed.completedDates || [];
                setCompletedDatesSet(new Set(dates));
            }
        } catch (e) {
            console.warn("Failed to parse challengeData", e);
        }
    }, [])

    //save on changes
    useEffect(() => {
        const payload = {
            completedCount,
            completedDates: Array.from(completedDatesSet),
        };
        localStorage.setItem("challengeData", JSON.stringify(payload));
    }, [completedCount, completedDatesSet]);

    {/** const markComplete = () => {
        const today = isoToday();
        setCompletedDatesSet((prev) => {
            const next = new Set(prev);
            if(!next.has(today)){
                next.add(today);
            }
            return next;
        });
        setCompletedCount((c) => c + 1);
    }*/}

    {/*const toggleDate = (iso: string) => {
        setCompletedDatesSet((prev) => {
            const next = new Set(prev);
            if(next.has(iso)) next.delete(iso);
            else next.add(iso);
            return next;
        });

        //setCompletedCount((c) => (completedDataSet.has(iso) ? Math.max(0, c - 1) : c + 1));
    }*/}

    return (
        <main className="main-container">
            {/*Main Header*/}
            <Header
                dailyChallenge={dailyChallenge}
                completedCount={completedCount}
                currentChallenge={currentChallenge}
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
            />

            <DailyChallengeCard dailyChallenge={dailyChallenge} /> 

            {/* Stats Cards */}
            <section className="stats-cards">
                <StatCard title="Streak" value={streakCount} />
                <StatCard title="Completed" value={completedCount} />
                <StatCard title="Difficulty" value={difficulty} />
            </section>

            {/* User vitals */}
            {/*<section className="user-vitals">
                <ProgressRing value={completedCount} goal={20} size={120} stroke={10} label="Monthly Goal" />
            </section>*/}
            
            {/* Main Content Area */}
            {/* Right Column */}
            <div className="page-content">
                <aside className="right-column">
                    {/* Controls Section */}
                    <CategorySelector
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                    <DifficultySelector
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                    />
                </aside>  

                {/* Left Column */}
                <main className="left-column">
                    {/* Challenge Display Section */}
                    <ChallengeBox
                        currentChallenge={currentChallenge}
                        isGenerating={isGenerating}
                        hasGenerated={hasGenerated}
                    />
                    <ButtonGroup
                        isGenerating={isGenerating}
                        hasGenerated={hasGenerated}
                        onGenerate={generateChallenge}
                        onCopy={() => navigator.clipboard.writeText(currentChallenge)}
                    />
                </main>
            </div>
        </main>
    );
};

export default Home;