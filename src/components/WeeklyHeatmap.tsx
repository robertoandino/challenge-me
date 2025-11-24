import React, { useMemo } from "react"; 

interface WeeklyHeatmapProps {
    completedDates: Set<string>;
    onToggleDate?: (dateISO: string) => void;
}

function isoDate(d: Date) {
    return d.toISOString().slice(0, 10);
}
const WeeklyHeatmap: React.FC<WeeklyHeatmapProps> = ({ completedDates, onToggleDate }) => {
    return (
        <p>hi</p>
    )
}

export default WeeklyHeatmap;