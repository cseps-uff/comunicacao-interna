'use client';

import { useEffect, useMemo, useState } from 'react';
import { addActivity, ActivityStatus, useActivities } from '../shared/activities';
import './task.css'; // Importação do seu arquivo CSS na mesma pasta

const columnOrder: ActivityStatus[] = ['Pendente', 'Não iniciada', 'Em andamento', 'Concluída'];

export default function TarefasPage() {
  const activities = useActivities();
  const [selectedStatus, setSelectedStatus] = useState<ActivityStatus>('Pendente');
  const [form, setForm] = useState({
    title: '',
    day: String(new Date().getDate()),
    time: '09:00',
    description: '',
  });

  const columns = useMemo(() => {
    return columnOrder.map((status) => ({
      status,
      items: activities.items.filter((activity) => activity.status === status),
    }));
  }, [activities]);

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addActivity({
      title: form.title.trim(),
      day: Number(form.day),
      time: form.time,
      description: form.description.trim(),
      status: selectedStatus,
    });

    setForm((currentForm) => ({
      ...currentForm,
      title: '',
      description: '',
    }));
  }

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

      <form className="activity-form" onSubmit={handleSubmit}>
        <input
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Título da atividade"
          required
        />
        <input
          type="number"
          min="1"
          max="31"
          value={form.day}
          onChange={(event) => setForm({ ...form, day: event.target.value })}
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={(event) => setForm({ ...form, time: event.target.value })}
          required
        />
        <textarea
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Descrição"
          required
        />
        <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value as ActivityStatus)}>
          {columnOrder.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button type="submit">Adicionar atividade</button>
      </form>


      {/* TypeScript do botao de filtro inserido antes das tabelas*/}
      <div className="dropdown-filter" style={{ alignSelf: 'flex-start' }}>
          <input type="checkbox" id="meu-filtro-toggle" className="dropdown-toggle" />
          
          <label htmlFor="meu-filtro-toggle" className="dropdown-button">
            FILTROS
          </label>

          <div className="dropdown-menu">
            <label className="dropdown-item">
              <input type="checkbox" name="categoria"/> PROJETO "X"
            </label>
            <label className="dropdown-item">
              <input type="checkbox" name="categoria"/> PROJETO "Y"
            </label>
            <label className="dropdown-item">
              <input type="checkbox" name="categoria"/> MAIS RECENTES
            </label>
            <label className="dropdown-item">
              <input type="checkbox" name="categoria"/> ATRASADAS
            </label>
          </div>
        </div>

      {/* O container antigo agora virou uma div para manter as colunas lado a lado */}
      <div className="Tarefas" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        
        {columns.map(({ status, items }, index) => (
        <div className="tarefas-column" data-id={String(index + 1)} key={status}>
          <div className="tarefas-title">
            <h2>{status}</h2>
            <button className="add-card">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="tarefas-cards">
            {items.map((activity) => (
              <article className="tarefas-card" key={activity.id}>
                <span className="badge medium">Dia {activity.day}</span>
                <strong>{activity.title}</strong>
                <p>{activity.description}</p>
                <small>{activity.time}</small>
              </article>
            ))}
          </div>
        </div>
        ))}

      </div>
    </main>
  </>
);
}
