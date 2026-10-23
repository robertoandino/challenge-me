import { useMemo } from "react";
import Animations from "../StatCard/Animations";
import { dateKey } from "../../utils/storage";
import "./StreakWeek.css";

interface StreakWeekProps {
    streak: number;
    completed: number;
    completedDates: ReadonlySet<string>;
    showReaction: boolean;
    onReact: () => void;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function StreakWeek({ streak, completed, completedDates, showReaction, onReact }: StrealWeekProps){
    
    const doneToday = completedDates.has(dateKey());

    // Monday to Sunday of the current week
    const days = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

        return WEEKDAYS.map((name, i) => {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            return {
                name,
                letter: name[0],
                done: completedDates.has(dateKey(d)),
                isToday: d.getTime() === today.getTime(),
                future: d > today,
            };
        });
    }, [completedDates]);
    
    return (
        <h1>
            hi
        </h1>
    )
}

export default StreakWeek;