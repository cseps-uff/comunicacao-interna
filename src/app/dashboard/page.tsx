'use client';

import { useState } from 'react';
import './dashboard.css';

//Dados base (para MACRO e MICRO)
type TarefaIEEE = {
    id: number;
    titulo: string;
    capitulo: string;
    projeto: string;
    status: 'Pendente' | 'Em andamento' | 'Concluída';
};

// as tarefas precisam ser conectadas a API (ou preencher dinamicamente)
const tarefasIniciais: TarefaIEEE[] = [];

//conteudos
const todosOsCapitulos = ['Todos', 'C1', 'C2', 'C3', 'C4'];

//aqui ja auxilia na logica da funcao "gerenciarMudancaDeCapitulo"
const projetosPorCapitulo: Record<string, string[]> = {
    Todos: ['Todos', 'P1', 'P2', 'P3', 'P4'],
    C1: ['Todos', 'P1'],
    C2: ['Todos', 'P2'],
    C3: ['Todos', 'P3'],
    C4: ['Todos', 'P4'],
};

export default function MiniDash() {
    // Filtros e suas funcoes (obs: inicializa ambos em 'Todos')
    const [filtroCapitulo, setFiltroCapitulo] = useState('Todos');
    const [filtroProjeto, setFiltroProjeto] = useState('Todos');

    // Os filtros em si precisam mudar de acordo com o capitulo
    const projetosDisponiveis = projetosPorCapitulo[filtroCapitulo] ?? ['Todos'];

    // Quando o capítulo muda, voltamos o projeto para "Todos"
    // evitar que o select aponte para uma opção que não existe naquele capítulo
    function gerenciarMudancaDeCapitulo(valor: string) {
        setFiltroCapitulo(valor);
        setFiltroProjeto('Todos');
    }

    // Logica de filtragem (se for todos ou se tiver correto, aparece)
    const tarefasFiltradas = tarefasIniciais.filter((tarefa) => {
        const bateCapitulo = filtroCapitulo === 'Todos' || tarefa.capitulo === filtroCapitulo;
        const bateProjeto = filtroProjeto === 'Todos' || tarefa.projeto === filtroProjeto;

        return bateCapitulo && bateProjeto;
    });

    // Dados para o grafico de pizza E resumos
    const totalTarefas = tarefasIniciais.length;
    const totalPendentes = tarefasFiltradas.filter((tarefa) => tarefa.status === 'Pendente').length;
    const totalEmAndamento = tarefasFiltradas.filter((tarefa) => tarefa.status === 'Em andamento').length;
    const totalConcluidas = tarefasFiltradas.filter((tarefa) => tarefa.status === 'Concluída').length;

    // Pizza simples (molde padrão)
    const fatiasStatus = [
        { label: 'Pendente', valor: totalPendentes, cor: '#f59e0b' },
        { label: 'Em andamento', valor: totalEmAndamento, cor: '#3b82f6' },
        { label: 'Concluída', valor: totalConcluidas, cor: '#22c55e' },
    ];
    const totalStatus = fatiasStatus.reduce((soma, fatia) => soma + fatia.valor, 0);
    let acumuladoStatus = 0;
    const pizzaStatus = totalStatus
        ? fatiasStatus
            .map((fatia) => {
                const inicio = (acumuladoStatus / totalStatus) * 100;
                acumuladoStatus += fatia.valor;
                const fim = (acumuladoStatus / totalStatus) * 100;
                return `${fatia.cor} ${inicio}% ${fim}%`;
            })
            .join(', ')
        : '#d1d5db 0% 100%';


    return (
        <main id="box">

            {/* Pequeno resumo (total de tarefas e as pendentes) */}
            <section className="stats-grid">
                <article className="stat-card accent-blue">
                    <span>Total de tarefas</span>
                    {totalTarefas}
                </article>
                <article className="stat-card accent-yellow">
                    <span>Pendentes</span>
                    {totalPendentes}
                </article>
            </section>

            {/* Filtros (macro e micro) OBS: ainda faltam os internos aos projetos*/}
            <section className="filters-panel">
                <div className="area-filtro">
                    <label htmlFor="filtro-capitulo">Macro: capítulo</label>
                    <select
                        id="filtro-capitulo"
                        name="capitulo"
                        value={filtroCapitulo}
                        onChange={(evento) => gerenciarMudancaDeCapitulo(evento.target.value)}
                    >
                        {todosOsCapitulos.map((capitulo) => (
                            <option key={capitulo} value={capitulo}>
                                {capitulo}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="area-filtro">
                    <label htmlFor="filtro-projeto">Micro: projeto interno</label>
                    <select
                        id="filtro-projeto"
                        name="projeto"
                        value={filtroProjeto}
                        onChange={(evento) => setFiltroProjeto(evento.target.value)}
                    >
                        {projetosDisponiveis.map((projeto) => (
                            <option key={projeto} value={projeto}>
                                {projeto}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            {/* filtros internos (status, prioridade, prazo, ...) */}

            {/* Grafico simples (tambem baseado em moldes) */}
            <section className="charts-grid single-chart">
                <article className="chart-card">
                    <div className="chart-header">
                        <h2>Status das tarefas</h2>
                        <span>{totalStatus} itens</span>
                    </div>
                    <div className="pie-wrap">
                        <div className="pie-chart" style={{ background: `conic-gradient(${pizzaStatus})` }} />
                        <div className="pie-center">
                            {totalStatus}
                            <small>tarefas</small>
                        </div>
                    </div>
                    <div className="legend-list">
                        {fatiasStatus.map((fatia) => (
                            <div key={fatia.label} className="legend-item">
                                <span className="legend-dot" style={{ backgroundColor: fatia.cor }} />
                                <span>{fatia.label}</span>
                                {fatia.valor}
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </main>
    );
}
