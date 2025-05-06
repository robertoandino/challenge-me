import React, { useState } from "react";
import { challenges } from "../data/challenges";

const Home: React.FC = () => {
    const [currentChallenge, setCurrentChallenge] = useState<string>("Click the button to receieve a challenge!");

    const generateChallenge = () => {
        const randomIndex = Math.floor(Math.random() *  challenges.length);
        setCurrentChallenge(challenges[randomIndex]);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
                {/*Header*/}
                <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-300">
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-800 text-transparent bg-clip-text">
                        Challenge me
                    </h1>
                    <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
                        Get a random mental or physical challenge to energize your day.
                    </p>
                </div>

                {/*Challenge Box (placeholder)*/}
                <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-8
                    border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300
                    hover:border-rose-500/30">
                    <p className="text-white text-2xl font-medium leading-relaxed">
                        {currentChallenge}
                    </p>
                </div>

                {/*Button*/}
                <button 
                    onClick={generateChallenge}
                    className="bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold
                        py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                        transition duration-300 ease-in-out focus:outline-none focusLring-2
                        focus:ring-rose-500 focus:ring-opacity-50 text-lg"
                    aria-label="Generate a new random challenge"    
                >
                    Generate Challenge
                </button>
            </div>
        </main>
    );
};

export default Home;