import React from "react";

interface DailyChallengeCardProps {
    dailyChallenge: string;
}

const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({ dailyChallenge}) => {
    return (
        <section className="section-card daily-challenge-card">
            <h2>🌞 Daily Challenge</h2>
            <div className="daily-challegen-box">
                <p>{dailyChallenge}</p>
            </div>
        </section>
    );
}

export default DailyChallengeCard;