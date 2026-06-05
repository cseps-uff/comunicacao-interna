"use client";

import { useMemo, useState } from "react";
import "./calend.css";

type Activity = {
    title: string;
    time: string;
    description: string;
};

function getDaysInCurrentMonth(): number {
    const actualMonth = new Date().getMonth() + 1;
    const actualYear = new Date().getFullYear();

    return new Date(actualYear, actualMonth, 0).getDate();
}

function getToday(): number {
    return new Date().getDate();
}

const activitiesByDay: Record<number, Activity[]> = {
    2: [
        {
            title: "Reunião com a coordenação",
            time: "09:00",
            description: "Alinhar demandas da semana e pendências do setor.",
        },
        {
            title: "Entrega de relatório",
            time: "15:30",
            description: "Enviar o consolidado das atividades internas.",
        },
    ],
    8: [
        {
            title: "Atualização do painel",
            time: "10:00",
            description: "Revisar indicadores e publicar as novidades.",
        },
    ],
    15: [
        {
            title: "Treinamento da equipe",
            time: "14:00",
            description: "Sessão de alinhamento com novos procedimentos.",
        },
        {
            title: "Checagem de tarefas",
            time: "16:00",
            description: "Verificar o andamento das pendências abertas.",
        },
    ],
};

export default function Grid() {
    const daysInMonth = getDaysInCurrentMonth();
    const today = getToday();
    const [selectedDay, setSelectedDay] = useState(today);

    const selectedActivities = useMemo(() => {
        return activitiesByDay[selectedDay] ?? [];
    }, [selectedDay]);

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