"use client"; // Essa diretiva é necessária no Next.js pois temos interatividade na tela (clicks e estados)

import { useState } from "react";
import Link from "next/link";

export default function TaskMasterApp() {
  // O useState substitui a lógica do app.ts para controlar qual tela está ativa
  const [activeView, setActiveView] = useState("home-view");

  return (
    <>
      {/* Layout Principal */}
      {/*============================================*/}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Menu lateral</h3>
          <ul className="space-list">
            <li><Link href="/tarefas">📝 Tarefas</Link></li>
            <li><Link href="/calendario">🗓️ Calendário</Link></li>
            <li><Link href="/dashboard">📈 Dashboard</Link></li>
            <li><a href="https://drive.google.com/drive/folders/1l7Syo-oopkDD9_LqSzi4YY5q32plP6vd" target="_blank">📄 Drive do Capitulo</a></li>
          </ul>
        </aside>
        {/*============================================*/}


        {/* Conteúdo Principal */}
        {/*============================================*/}
        <main className="content">
          {/* Renderização Condicional: O React só mostra a section se ela for o state ativo */}
          
          {activeView === "home-view" && (
            <section className="view-section active-view">
              <h1>Bem-vindo ao ComunicaIEE</h1>
              <br/>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolorem. Aliquid, cumque? Magnam non consequuntur repellendus quod explicabo maxime omnis amet eos esse iste. Suscipit ex fugit nesciunt quam tempora?</p>
              <br/>
              <p>Aqui devem aparecer as últimas coisas que aconteceram, tipo na home do github.</p>
            </section>
          )}

          {activeView === "tasks-view" && (
            <section className="view-section active-view">
              <h1>Minhas Tarefas</h1>
              <div className="task-board">
                <div className="task-column">
                  <div className="column-header to-do">A Fazer</div>
                  <div className="task-card">Criar protótipo do site</div>
                  <div className="task-card">Revisar documentação</div>
                </div>
                <div className="task-column">
                  <div className="column-header in-progress">Em Progresso</div>
                  <div className="task-card">Configurar TypeScript no Next.js</div>
                </div>
                <div className="task-column">
                  <div className="column-header done">Concluído</div>
                  <div className="task-card">Reunião de Kick-off</div>
                </div>
              </div>
            </section>
          )}

          {activeView === "dashboards-view" && (
            <section className="view-section active-view">
              <h1>Dashboards</h1>
              <p>Aqui você verá gráficos e métricas de produtividade da equipe.</p>
              <div className="placeholder-chart">Gráfico de Produtividade (Em breve)</div>
            </section>
          )}
        </main>
      </div>
      {/*============================================*/}
      {/* essa div é enorme, inclui tudo que é do menu principal */}
    </>
  );
}