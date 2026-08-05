"use client";

import { useSyncExternalStore } from "react";

export type ActivityStatus = "Pendente" | "Não iniciada" | "Em andamento" | "Concluída";

export type Activity = {
    id: string;
    day: number;
    title: string;
    time: string;
    description: string;
    status: ActivityStatus;
};

type ActivityStore = {
    items: Activity[];
};

const storageKey = "comunica-activities";

const defaultActivities: Activity[] = [
    {
        id: "activity-2-1",
        day: 2,
        title: "Reunião com a coordenação",
        time: "09:00",
        description: "Alinhar demandas da semana e pendências do setor.",
        status: "Pendente",
    },
    {
        id: "activity-2-2",
        day: 2,
        title: "Entrega de relatório",
        time: "15:30",
        description: "Enviar o consolidado das atividades internas.",
        status: "Em andamento",
    },
    {
        id: "activity-8-1",
        day: 8,
        title: "Atualização do painel",
        time: "10:00",
        description: "Revisar indicadores e publicar as novidades.",
        status: "Não iniciada",
    },
    {
        id: "activity-15-1",
        day: 15,
        title: "Treinamento da equipe",
        time: "14:00",
        description: "Sessão de alinhamento com novos procedimentos.",
        status: "Concluída",
    },
    {
        id: "activity-15-2",
        day: 15,
        title: "Checagem de tarefas",
        time: "16:00",
        description: "Verificar o andamento das pendências abertas.",
        status: "Pendente",
    },
];

const listeners = new Set<() => void>();
let currentStore: ActivityStore = { items: defaultActivities };
let hasHydratedStore = false;

function createInitialState(): ActivityStore {
    return currentStore;
}

function readStore(): ActivityStore {
    if (typeof window === "undefined") {
        return currentStore;
    }

    if (!hasHydratedStore) {
        hasHydratedStore = true;

        const rawValue = window.localStorage.getItem(storageKey);

        if (!rawValue) {
            window.localStorage.setItem(storageKey, JSON.stringify(currentStore));
            return currentStore;
        }

        try {
            currentStore = JSON.parse(rawValue) as ActivityStore;
        } catch {
            currentStore = { items: defaultActivities };
            window.localStorage.setItem(storageKey, JSON.stringify(currentStore));
        }
    }

    return currentStore;
}

function writeStore(nextStore: ActivityStore) {
    if (typeof window === "undefined") {
        return;
    }

    currentStore = nextStore;
    window.localStorage.setItem(storageKey, JSON.stringify(nextStore));
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);

    const handleStorage = (event: StorageEvent) => {
        if (event.key === storageKey) {
            listener();
        }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", handleStorage);
    };
}

export function useActivities() {
    return useSyncExternalStore(subscribe, readStore, createInitialState);
}

export function getActivities() {
    return readStore().items;
}

export function getActivitiesByDay(day: number) {
    return getActivities().filter((activity) => activity.day === day);
}

export function getActivitiesByStatus(status: ActivityStatus) {
    return getActivities().filter((activity) => activity.status === status);
}

export function addActivity(activity: Omit<Activity, "id">) {
    const nextActivity: Activity = {
        ...activity,
        id: crypto.randomUUID(),
    };

    const nextStore = {
        items: [...getActivities(), nextActivity],
    };

    writeStore(nextStore);
    return nextActivity;
}
