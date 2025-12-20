import React from "react";
import "./ChallengeBox.css"

interface ChallengeBoxProps {
    currentChallenge: string;
    isGenerating: boolean;
    //hasGenerated: boolean;
}

const ChallengeBox: React.FC<ChallengeBoxProps> = ({
    currentChallenge,
    isGenerating,
    //hasGenerated,
}) => {
    return (
        <div className="challenge-container">
            <div className="challenge-box">
                {isGenerating ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <p key={currentChallenge} className="challenge-text">{currentChallenge}</p>
                )}
            </div>
        </div>
    );
};

export default ChallengeBox;