import React from "react";
import "./StatCard.css";

interface StatCardProps {
    title: string;
    value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value}) => {
    const getIcon = (title: string) => {
        if (title.includes("Streak")) return "🔥";
        if (title.includes("Completed")) return "✅";
        if (title.includes("Difficulty")) return "🎯";
        if (title.includes("Category")) return "📚";
        return "📊";
    }

    return (
        <div className="stat-card">
            <div className="stat-icon">{getIcon(title)}</div>
            {/*<h3>{title}</h3>*/}
            <p>{value}</p>
        </div>
    );
};

export default StatCard;