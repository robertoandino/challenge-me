import type { Quote } from "../../data/quotes";
import "./DailyQuoteCard.css";

interface DailyQuoteCardProps {
    dailyQuote: Quote | null;
}

function DailyQuoteCard({ dailyQuote }: DailyQuoteCardProps) {
    if (!dailyQuote) return null;

    return (
        <figure className="dq">
            <blockquote className="dq-text">{dailyQuote.text}</blockquote>
            <figcaption className="dq-author">{dailyQuote.author}</figcaption>
        </figure>
    );
}

export default DailyQuoteCard;