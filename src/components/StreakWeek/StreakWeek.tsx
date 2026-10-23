interface StreakWeekProps {
    streak: number;
    completed: number;
    completedDates: ReadonlySet<string>;
    showReaction: boolean;
    onReact: () => void;
}

function StreakWeek({ streak, completed, completedDates, showReaction, onReact }: StrealWeekProps){
    return (
        <h1>
            hi
        </h1>
    )
}

export default StreakWeek;