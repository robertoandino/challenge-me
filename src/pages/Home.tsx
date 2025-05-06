import React from "react";

const Home: React.FC = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4
            py-8 bg-gradient-to-br from-red-100 to-white">
            {/*Header*/}
            <h1 className="text-4xl font-bold mb-4 text-center text-blue-800">
                Challenge me
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                Get a random mental or physical challenge to energize your day.
            </p>

            {/*Challenge Box (placeholder)*/}
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200 text-center">
                <p className="text-gray-700 text-xl">[Challenge here]</p>
            </div>

            {/*Button*/}
            <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition"
                aria-label="Generate a new random challenge"    
            >
                Generate Challenge
            </button>
        </main>
    );
};

export default Home;