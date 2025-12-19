import React from "react";
import "./DailyQuoteCard.css"

interface DailyQuoteCardProps {
    dailyQuote: string;
}

const DailyQuoteCard: React.FC<DailyQuoteCardProps> = ({ dailyQuote }) => {
    return (
        <div className="daily-challenge-box">
            <p>{dailyQuote}</p>
        </div>
    );
}

export default DailyQuoteCard;