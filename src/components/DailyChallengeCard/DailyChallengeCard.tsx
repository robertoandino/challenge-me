import React from "react";
import "./DailyChallengeCard.css"

interface DailyChallengeCardProps {
    dailyChallenge: string;
}

const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({ dailyChallenge}) => {
    return (
        <section className="daily-challenge-card">
            <h2>🌞 Daily Challenge</h2>
            <div className="daily-challenge-box">
                <p>{dailyChallenge}</p>
            </div>
        </section>
    );
}

export default DailyChallengeCard;