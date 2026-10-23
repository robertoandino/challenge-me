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
    return (
        <h1>
            hi
        </h1>
    )
}

export default StreakWeek;