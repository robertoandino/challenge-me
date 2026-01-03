import React, { useState, useEffect } from "react";
import { challenges } from "../../data/challenges";
import { ChallengeCategory } from "../../data/Challenge";
import { quotes, Quote } from "../../data/quotes";
import "./Home.css";
import "../responsive.css";
import Header from "../../components/Header/Header";
import StatCard from "../../components/StatCard/StatCard";
import ChallengeBox from "../../components/ChallengeBox/ChallengeBox";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import DailyQuoteCard from "../../components/DailyQuoteCard/DailyQuoteCard";
//import profileMenu from "../components/ProfileMenu";
//import ProgressRing from "../components/ProgressRing/ProgressRing";

interface PersistedChallengeState {
    currentChallenge: string;
    streakCount: number;
    completedCount: number;
    difficulty: string;
    selectedCategory: ChallengeCategory | "all"
    challengeHistory: string[];
    completedDates: string[];
}

const Home: React.FC = () => {
    //Current challenge
    const [currentChallenge, setCurrentChallenge] = useState<string>("Time To Train");
    
    //Completed challenge
    const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);

    //Loading state
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    //History
    const [challengeHistory, setChallengeHistory] = useState<String[]>([]);
    console.log(challengeHistory);
    
    //Streak
    const [showStreakReaction, setShowStreakReaction] = useState(false);
    console.log(showStreakReaction);

    //Quotes
    const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);

    //Stats
    const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | 'all'>('all');
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [streakCount, setStreakCount] = useState<number>(0);
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [completedDatesSet, setCompletedDatesSet] = useState<Set<string>>(new Set())
    
    //New
    const [showCompletedToast, setShowCompletedToast] = useState(false);
    const [completedDisabled, setCompletedDisabled] = useState(false);

    //Daily Challenge
    const [dailyChallenge, setDailyChallenge] = useState<string>("");
    
    //Profile Menu
    const [profileOpen, setProfileOpen] = useState(false);

    //Difficulty Selection logic
    const cycleDifficulty = () => {
        setDifficulty(prev =>
            prev === "easy" ? "medium" :
            prev === "medium" ? "hard" : "easy"
        );
    };

    //Category Selection logic
    const cycleCategory = () => {
        setSelectedCategory(prev => 
            prev === "all" ? "physical" :
            prev === "physical" ? "mental" :
            prev === "mental" ? "creative" :
            prev === "creative" ? "social" : "all"
        );
    };

    //Generate Challenge Logic
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
            setIsChallengeCompleted(false);
            setChallengeHistory(prev => [newChallenge.text, ...prev].slice(0, 5));
            setStreakCount(prev => prev + 1);
            setIsGenerating(false);
            setHasGenerated(true);
        }, 500);
    };

    //Mark Completed logic
    const handleCompletedClick = () => {
        if (completedDisabled) return;
        setCompletedDisabled(true);
        setCompletedCount(prev => prev + 1);
        setStreakCount(prev => prev + 1);

        //Persistence
        const today = new Date().toISOString().slice(0, 10);
        setCompletedDatesSet(prev => new Set(prev).add(today));

        //Challenge Completed?
        setIsChallengeCompleted(true)

        //Toast
        setShowCompletedToast(true);
        setTimeout(() => setShowCompletedToast(false), 2000);
        setTimeout(() => setCompletedDisabled(false), 1000)
    } 

    //Daily Challenge logic NOT USED
    function getDailyChallenge() {
        const today = new Date();
        //date as a string in YYYY-MM-DD format
        const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1)
        const index = daySeed % challenges.length;
        return challenges[index];
    }

    //Daily Quote logic
    function getDailyQuote() {
        const today = new Date();

        //stable daily number
        const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        
        const index = daySeed % quotes.length;

        return quotes[index];
    };

    //Streak Card logic
    function handleStreakClick() {
        setShowStreakReaction(true);

        //auto hide after animation
        setTimeout(() => {
            setShowStreakReaction(false);
        }, 1500);
    };

    //Daily quote effect
    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);
        setDailyQuote(getDailyQuote());
        //for vercel deployment
        console.log(today);
    }, []);

    /*
    useEffect(() => {
        setDailyQuote(getDailyQuote());
    }, [])
    */

    //Daily challenge effect
    useEffect(() => {
        setDailyChallenge(getDailyChallenge().text);
    }, [])
    

    //load persisted state once
    useEffect(() => {
        try {
            const raw = localStorage.getItem("challengeState");
            if (!raw) return;

            const parsed: PersistedChallengeState = JSON.parse(raw);

            setCurrentChallenge(parsed.currentChallenge || "Time to Train");
            setStreakCount(parsed.streakCount || 0);
            setCompletedCount(parsed.completedCount || 0);
            setDifficulty(parsed.difficulty || "easy");
            setSelectedCategory(parsed.selectedCategory || "all");
            setChallengeHistory(parsed.challengeHistory || []);
            setCompletedDatesSet(new Set(parsed.completedDates || []));
            setHasGenerated(!!parsed.currentChallenge);
        } catch (e) {
            console.warn("Failed to load challenge state", e);
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

            <DailyQuoteCard dailyQuote={dailyQuote} /> 

            {/* Stats Cards */}
            <section className="stats-cards">
                <StatCard 
                    title="Streak Count" 
                    value={streakCount}
                    showReaction={showStreakReaction}
                    onClick={handleStreakClick} 
                    info="Streak"           
                />
                <StatCard 
                    title="Mark as completed" 
                    value={completedCount}
                    onClick={handleCompletedClick} 
                    info="Completed"    
                    disabled={!hasGenerated ||  isChallengeCompleted}
                />
                {showCompletedToast && (
                    <div className="completion-toast">✅ Challenge Completed!</div>
                )}
                <StatCard 
                    title="Select Difficulty" 
                    value={difficulty} 
                    onClick={cycleDifficulty}
                    info="Difficulty"
                />
                <StatCard 
                    title="Select Category" 
                    value={selectedCategory} 
                    onClick={cycleCategory}
                    info="Category"
                />
            </section>

            {/* Challenge Display Section */}
            <div className="challenge-content">
                {/* Challenge Display Section */}
                <ChallengeBox
                    currentChallenge={currentChallenge}
                    isGenerating={isGenerating}
                    //hasGenerated={hasGenerated}
                />
                <ButtonGroup
                    isGenerating={isGenerating}
                    hasGenerated={hasGenerated}
                    onGenerate={generateChallenge}
                    onCopy={() => navigator.clipboard.writeText(currentChallenge)}
                />
            </div>
        </main>
    );
};

export default Home;