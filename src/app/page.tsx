"use client"; // Essa diretiva é necessária no Next.js pois temos interatividade na tela (clicks e estados)

import { useState } from "react";

export default function TaskMasterApp() {
  // O useState substitui a lógica do app.ts para controlar qual tela está ativa
  const [activeView, setActiveView] = useState("home-view");

  return (
    <>
      {/* Header */}
      <header className="topbar">
        <div className="logo">TaskMaster</div>
        <nav className="nav-links">
          <a
            href="#"
            className={activeView === "home-view" ? "active" : ""}
            onClick={(e) => { e.preventDefault(); setActiveView("home-view"); }}
          >
            Início
          </a>
          <a
            href="#"
            className={activeView === "tasks-view" ? "active" : ""}
            onClick={(e) => { e.preventDefault(); setActiveView("tasks-view"); }}
          >
            Minhas Tarefas
          </a>
          <a
            href="#"
            className={activeView === "dashboards-view" ? "active" : ""}
            onClick={(e) => { e.preventDefault(); setActiveView("dashboards-view"); }}
          >
            Dashboards
          </a>
        </nav>
        <div className="user-profile">
          <div className="avatar">U</div>
        </div>
      </header>

      {/* Layout Principal */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Spaces</h3>
          <ul className="space-list">
            <li>🚀 Desenvolvimento</li>
            <li>🎨 Design</li>
            <li>📢 Marketing</li>
          </ul>
        </aside>

        {/* Conteúdo Principal */}
        <main className="content">
          {/* Renderização Condicional: O React só mostra a section se ela for o state ativo */}
          
          {activeView === "home-view" && (
            <section className="view-section active-view">
              <h1>Bem-vindo ao TaskMaster</h1>
              <p>Selecione uma área no menu superior ou lateral para começar a organizar seus projetos.</p>
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-info">
          <p>&copy; 2026 TaskMaster Inc. Todos os direitos reservados.</p>
          <p>Contato: suporte@taskmaster.com | +55 (11) 99999-9999</p>
        </div>
        <div className="footer-links">
          <a href="#">Termos de Uso</a>
          <a href="#">Privacidade</a>
          <a href="#">Central de Ajuda</a>
        </div>
      </footer>
    </>
  );
}