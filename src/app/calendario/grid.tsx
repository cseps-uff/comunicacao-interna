"use client";

import { useMemo, useState } from "react";
import { getActivitiesByDay, useActivities } from "../shared/activities";
import "./calend.css";

function getDaysInCurrentMonth(): number {
    const actualMonth = new Date().getMonth() + 1;
    const actualYear = new Date().getFullYear();

    return new Date(actualYear, actualMonth, 0).getDate();
}

function getToday(): number {
    return new Date().getDate();
}

export default function Grid() {
    const daysInMonth = getDaysInCurrentMonth();
    const today = getToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const activities = useActivities();

    const selectedActivities = useMemo(() => {
        return activities.items.filter((activity) => activity.day === selectedDay);
    }, [activities, selectedDay]);

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(
            <button
                key={i}
                type="button"
                className={`day ${i === today ? "actual-day" : ""} ${i === selectedDay ? "selected-day" : ""}`}
                onClick={() => setSelectedDay(i)}
            >
                <span className="n-day">{i}</span>
            </button>
        );
    }

    return (
        <section className="calendar-wrapper">
            <section className="calendar">
                {days}
            </section>

            <aside className="activities-panel">
                <div className="activities-header">
                    <h2>Atividades do dia {selectedDay}</h2>
                    <p>
                        {selectedActivities.length > 0
                            ? `${selectedActivities.length} atividade(s) agendada(s)`
                            : "Nenhuma atividade agendada para este dia."}
                    </p>
                </div>

                <div className="activities-list">
                    {selectedActivities.length > 0 ? (
                        selectedActivities.map((activity) => (
                            <article key={`${selectedDay}-${activity.time}-${activity.title}`} className="activity-card">
                                <span className="activity-time">{activity.time}</span>
                                <div>
                                    <h3>{activity.title}</h3>
                                    <p>{activity.description}</p>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="activity-empty">
                            Clique em outro dia para ver ou adicionar atividades.
                        </div>
                    )}
                </div>
            </aside>
        </section>
    );
}