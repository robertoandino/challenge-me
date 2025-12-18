import React from "react";
import "./ChallengeBox.css"

interface ChallengeBoxProps {
    currentChallenge: string;
    isGenerating: boolean;
    hasGenerated: boolean;
}

const ChallengeBox: React.FC<ChallengeBoxProps> = ({
    currentChallenge,
    isGenerating,
    hasGenerated,
}) => {
    return (
        <div className={`challenge-container ${hasGenerated ? "has-generated" : ""}`}>
            <div className={`challenge-box ${hasGenerated ? "challenge-box-generated" : ""}`}>
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
    );
};

export default ChallengeBox;