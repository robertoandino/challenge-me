import React, { useState } from "react";
import { challenges } from "../data/challenges";

const Home: React.FC = () => {
    const [currentChallenge, setCurrentChallenge] = useState<string>("Click the button to receieve a challenge!");

    const generateChallenge = () => {
        const randomIndex = Math.floor(Math.random() *  challenges.length);
        setCurrentChallenge(challenges[randomIndex]);
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4
            py-8 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
            {/*Header*/}
            <h1 className="text-5xl font-extrabold mb-4 text-center">
                Challenge me
            </h1>
            <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
                Get a random mental or physical challenge to energize your day.
            </p>

            {/*Challenge Box (placeholder)*/}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20 text-center shadow-lg">
                <p className="text-white text-xl">{currentChallenge}</p>
            </div>

            {/*Button*/}
            <button 
                onClick={generateChallenge}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-6 rounded-xl
                    transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none 
                    focus:ring-2 focus:ring-rose-500"
                aria-label="Generate a new random challenge"    
            >
                Generate Challenge
            </button>
        </main>
    );
};

export default Home;