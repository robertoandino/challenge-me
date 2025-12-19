import React from "react";
import "./StatCard.css";

interface StatCardProps {
    title: string;
    value: string | number;
    onClick?: () => void;
    info?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, onClick, info}) => {
    const getIcon = (title: string) => {
        if (title.includes("Streak")) return "🔥";
        if (title.includes("Completed")) return "✅";
        if (title.includes("Difficulty")) return "🎯";
        if (title.includes("Category")) return "📚";
        return "📊";
    }

    return (
        <div 
            className={`stat-card ${onClick ? "stat-card-button" : ""}`}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
        >    
            <div className="stat-icon">{getIcon(title)}</div>
            <p>{value}</p>

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