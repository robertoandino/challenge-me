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

function StreakWeek({ streak, completed, completedDates, showReaction, onReact }: StreakWeekProps){
    
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

    const message = 
        streak === 0
            ? "Finish one challenge today to start a streak."
            : doneToday
                ? "Today is done. Keep going or rest."
                : "Complete a challegne today to keep it alive.";
    
    return (
        <section className="sw" aria-label="Streak">
            <div className="sw-left">
                <button type="button" className="sw-streak" onClick={onReact} >
                    <span className="sw-flame" aria-hidden="true">🔥</span>
                    <span className="sw-num">{streak}</span>
                    <span className="sw-unit">day streak</span>
                </button>
                {showReaction && (
                    <div className="sw-reaction" aria-hidden="true">
                        <Animations type={streak < 5 ? "sad" : "fireworks"}/>
                    </div>
                )}
            </div>

            <div className="sw-right">
                <ol className="sw-week">
                    {days.map((d) => (
                        <li
                            key={d.name}
                            className={`sw-day${d.done ? " done" : ""}${d.isToday ? " today" : ""}${d.future ? " future" : ""}`}
                            aria-label={`${d.name}${d.isToday ? " (today)" : ""}: ${d.done ? "done" : "not done"}`}
                        >
                            <span className="sw-dot" aria-hidden="true">
                                {d.done && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2.5 6.5L5 9l4.5-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </span>
                            <span className="sw-letter" aria-hidden="true">{d.letter}</span>
                        </li>
                    ))}
                </ol>
                <p className="sw-msg">{message}</p>
                <p className="sw-total">{completed} completed in total</p>
            </div>
        </section>
    )
}

export default StreakWeek;