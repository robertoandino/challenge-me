import React from "react";

const Home: React.FC = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4
            py-8 bg-gradient-to-br from-gray-900 to-gray-700">
            {/*Header*/}
            <h1 className="text-4xl font-bold mb-4 text-center text-white">
                Challenge me
            </h1>
            <p className="text-lg text-gray-300 mb-8 text-center">
                Get a random mental or physical challenge to energize your day.
            </p>

            {/*Challenge Box (placeholder)*/}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 text-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200 text-center">
                <p className="text-gray-700 text-xl">[Challenge here]</p>
            </div>

            {/*Button*/}
            <button 
                className="bg-rose-600 hover:bg-rose-700 shadow-md hover:shadow-lg transition duration-300 ease-in-out text-white font-semibold py-2 px-6 rounded-xl"
                aria-label="Generate a new random challenge"    
            >
                Generate Challenge
            </button>
        </main>
    );
};

export default Home;