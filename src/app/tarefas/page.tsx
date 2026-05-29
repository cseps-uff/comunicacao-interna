'use client';

import { useEffect } from 'react';
import './task.css'; // Importação do seu arquivo CSS na mesma pasta

export default function TarefasPage() {
  useEffect(() => {
    const cards = document.querySelectorAll('.tarefas-card');
    const columns = document.querySelectorAll('.tarefas-cards');

    // Funções de manipulação dos Cards
    const handleDragStart = (e: Event) => {
      (e.currentTarget as HTMLElement).classList.add('dragging');
    };

    const handleDragEnd = (e: Event) => {
      (e.currentTarget as HTMLElement).classList.remove('dragging');
    };

    cards.forEach(card => {
      card.addEventListener('dragstart', handleDragStart);
      card.addEventListener('dragend', handleDragEnd);
    });

    // Funções de manipulação das Colunas
    const handleDragOver = (e: Event) => {
      e.preventDefault();
      (e.currentTarget as HTMLElement).classList.add('cards-hover');
    };

    const handleDragLeave = (e: Event) => {
      (e.currentTarget as HTMLElement).classList.remove('cards-hover');
    };

    const handleDrop = (e: Event) => {
      (e.currentTarget as HTMLElement).classList.remove('cards-hover');
      const draggingCard = document.querySelector('.tarefas-card.dragging');
      if (draggingCard) {
        (e.currentTarget as HTMLElement).appendChild(draggingCard);
      }
    };

    columns.forEach(column => {
      column.addEventListener('dragover', handleDragOver);
      column.addEventListener('dragleave', handleDragLeave);
      column.addEventListener('drop', handleDrop);
    });

    // Limpeza dos eventos ao desmontar o componente (Evita bugs de duplicação)
    return () => {
      cards.forEach(card => {
        card.removeEventListener('dragstart', handleDragStart);
        card.removeEventListener('dragend', handleDragEnd);
      });
      columns.forEach(column => {
        column.removeEventListener('dragover', handleDragOver);
        column.removeEventListener('dragleave', handleDragLeave);
        column.removeEventListener('drop', handleDrop);
      });
    };
  }, []);

  return (
  <>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />

    {/* Nova Box Principal estilizada pelo seu CSS */}
    <main id="box">
      
      {/* O container antigo agora virou uma div para manter as colunas lado a lado */}
      <div className="Tarefas" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        
        {/* Coluna 1: Pendente */}
        <div className="tarefas-column" data-id="1">
          <div className="tarefas-title">
            <h2>Pendente</h2>
            <button className="add-card">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="tarefas-cards">
            {/* ... seu card aqui ... */}
          </div>
        </div>

        {/* Coluna 2: Não iniciada */}
        <div className="tarefas-column" data-id="2">
          <div className="tarefas-title">
            <h2>Não iniciada</h2>
            <button className="add-card">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="tarefas-cards">
            {/* ... seu card aqui ... */}
          </div>
        </div>

        {/* Coluna 3: Em andamento */}
        <div className="tarefas-column" data-id="3">
          <div className="tarefas-title">
            <h2>Em andamento</h2>
            <button className="add-card">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="tarefas-cards">
            {/* ... seu card aqui ... */}
          </div>
        </div>

        {/* Coluna 4: Concluída */}
        <div className="tarefas-column" data-id="4">
          <div className="tarefas-title">
            <h2>Concluída</h2>
            <button className="add-card">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="tarefas-cards">
            {/* ... seu card aqui ... */}
          </div>
        </div>

      </div>
    </main>
  </>
);
}