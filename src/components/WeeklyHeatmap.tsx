import React, { useMemo } from "react"; 

interface WeeklyHeatmapProps {
    completedDates: Set<string>;
    onToggleDate?: (dateISO: string) => void;
}

function isoDate(d: Date) {
    return d.toISOString().slice(0, 10);
}

//return array of last 7 date objects, oldest first
function last7Days(): Date[] {
    const days: Date[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--){
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        days.push(d);
    }
    return days;
}

const WeeklyHeatmap: React.FC<WeeklyHeatmapProps> = ({ completedDates, onToggleDate }) => {
    //const days = useMemo(() => last7Days(), []);

    return (
        <p></p>
    )
}

export default WeeklyHeatmap;