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
    const days = useMemo(() => last7Days(), []);

    return (
        <div className="weekly-heatmap" role="grid" aria-label="Weekly completion heatmap">
            <div className="heatmap-row" role="row">
                {days.map((d) => {
                    const iso = isoDate(d);
                    const completed = completedDates.has(iso);
                    const weekdayLabel = d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3);
                    
                    return (
                        <button
                            key={iso}
                            className={`heat-cell ${completed ? "heat-cell--filled" : "heat-cell--empty"}`}
                            title={`${weekdayLabel} • ${iso} • ${completed ? "Completed" : "Not completed"}`}
                            onClick={() => onToggleDate && onToggleDate(iso)}
                            aria-pressed={completed}
                            role="gridcell"
                        >
                            <span className="heat-day">{weekdayLabel}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default WeeklyHeatmap;