import React from "react";
import "./DailyQuoteCard.css"
import { Quote } from "../../data/quotes";

interface DailyQuoteCardProps {
    dailyQuote: Quote | null;
}

const DailyQuoteCard: React.FC<DailyQuoteCardProps> = ({ dailyQuote }) => {
    if (!dailyQuote) return null;

    return (
        <div className="fade-in">
            <div className="daily-quote-box">
                <p className="quote-text">{dailyQuote.text}</p>
                <span className="quote-author">- {dailyQuote.author}</span>
            </div>
        </div>
    );
}

export default DailyQuoteCard;