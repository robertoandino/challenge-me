import React from "react";
import "./StatCard.css";
import Animations from "./Animations";

interface StatCardProps {
    title: string;
    value: string | number;
    onClick?: () => void;
    showReaction?: boolean;
    info?: string;
    disabled?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, onClick, info, showReaction, disabled }) => {
    const getIcon = (title: string) => {
        if (title.includes("Streak")) return "🔥";
        if (title.includes("Completed")) return "✅";
        if (title.includes("Difficulty")) return "🎯";
        if (title.includes("Category")) return "📚";
        return "📊";
    }

    const streak = Number(value);
    
    return (
        <div 
            className={`stat-card ${onClick ? "stat-card-button" : ""} ${disabled ? "disabled" : ""}`}
            onClick={disabled ? undefined :onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            title={title}
        >    
            <div className="stat-icon">{getIcon(title)}</div>
            <p>{value}</p>

            {/**Animation */}
            {showReaction && (
                <div className="streak-reaction">
                    {streak < 5 && <Animations type="sad"/>}
                    {streak >= 5 && <Animations type="fireworks"/>}
                </div>
            )}

            {/**Tooltip*/}
            {info && (
                <div className="stat-tooltip">
                    {info}
                </div>
            )}
        </div>
    );
};

export default StatCard;