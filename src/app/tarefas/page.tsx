'use client';

import { useEffect, useMemo, useState } from 'react';
import { addActivity, ActivityStatus, useActivities } from '../shared/activities';
import './task.css'; // Importação do seu arquivo CSS na mesma pasta

const columnOrder: ActivityStatus[] = ['Pendente', 'Não iniciada', 'Em andamento', 'Concluída'];

{/* ALTERACOES DE ESTADOS */}

// export default function TarefasPage() {
//   const activities = useActivities();
//   const [selectedStatus, setSelectedStatus] = useState<ActivityStatus>('Pendente');

export default function TarefasPage() {
  const activities = useActivities(); // armazena dados em um array mutável.
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null); // guarda o ID unico do cartao, se nao estiver sendo arrastado, vira null.
  const [activeInlineFormColumn, setActiveInlineFormColumn] = useState<ActivityStatus | null>(null); // guarda o status de criacao de formulario, se clicar em "Pendente", vai gerar um card no "Pendente".


  const [form, setForm] = useState({
    title: '',
    day: String(new Date().getDate()),
    time: '09:00',
    description: '',
  });

  {/*CARREGAR DADOS SALVOS NO ARMAZENAMENTO LOCAL DO NAVEGADOR AO ABRIR A PÁGINA*/}

  useEffect(() => {
    const savedActivities = localStorage.getItem('meu_kanban_atividades');
    if (savedActivities && activities.items) {
      try {
        const parsed = JSON.parse(savedActivities);
        // substitui os itens da memória original pelos que estavam salvos no navegador.
        activities.items.length = 0; // limpa a array original com segurança.
        activities.items.push(...parsed); // injeta os itens salvos.
        setRenderTrigger(prev => prev + 1); // força o React a mostrar na tela.
      } catch (e) {
        console.error("Erro ao carregar dados do localStorage", e);
      }
    }
  }, [activities]);

  // assim que a tela abre, busca o texto 'meu_kanban_atividades' guardado no navegador. se achar = limpa a memória temporária e injeta os cards salvos; puxa o gatilho (renderTrigger) para mostrar na tela os dados.

  {/*SALVAR AUTOMATICAMENTE SEMPRE QUE O RENDER TRIGGER MUDAR*/}

  useEffect(() => {
    if (activities.items && activities.items.length >= 0) {
      // salva a lista atual convertida em texto dentro do navegador.
      localStorage.setItem('meu_kanban_atividades', JSON.stringify(activities.items));
    }
  }, [renderTrigger, activities.items]);

  // vigia o renderTrigger; adicionar, mover ou deletar um cartão faz esse bloco pegar a lista atualizada de tarefas, transformar em texto puro (JSON) que é enviado ao banco de dados local do navegador.

  const columnsData = useMemo(() => {
    return columnOrder.map((status) => ({
      status,
      items: activities.items.filter((activity) => activity.status === status),
    }));
  }, [activities, renderTrigger]);

  // useEffect(() => {
  //   const cards = document.querySelectorAll('.tarefas-card');
  //   const columns = document.querySelectorAll('.tarefas-cards');

  //   // Funções de manipulação dos Cards
  //   const handleDragStart = (e: Event) => {
  //     (e.currentTarget as HTMLElement).classList.add('dragging');
  //   };

  //   const handleDragEnd = (e: Event) => {
  //     (e.currentTarget as HTMLElement).classList.remove('dragging');
  //   };

  //   cards.forEach(card => {
  //     card.addEventListener('dragstart', handleDragStart);
  //     card.addEventListener('dragend', handleDragEnd);
  //   });

  //   // Funções de manipulação das Colunas
  //   const handleDragOver = (e: Event) => {
  //     e.preventDefault();
  //     (e.currentTarget as HTMLElement).classList.add('cards-hover');
  //   };

  //   const handleDragLeave = (e: Event) => {
  //     (e.currentTarget as HTMLElement).classList.remove('cards-hover');
  //   };

  //   const handleDrop = (e: Event) => {
  //     (e.currentTarget as HTMLElement).classList.remove('cards-hover');
  //     const draggingCard = document.querySelector('.tarefas-card.dragging');
  //     if (draggingCard) {
  //       (e.currentTarget as HTMLElement).appendChild(draggingCard);
  //     }
  //   };

  //   columns.forEach(column => {
  //     column.addEventListener('dragover', handleDragOver);
  //     column.addEventListener('dragleave', handleDragLeave);
  //     column.addEventListener('drop', handleDrop);
  //   });

  //   // Limpeza dos eventos ao desmontar o componente (Evita bugs de duplicação)
  //   return () => {
  //     cards.forEach(card => {
  //       card.removeEventListener('dragstart', handleDragStart);
  //       card.removeEventListener('dragend', handleDragEnd);
  //     });
  //     columns.forEach(column => {
  //       column.removeEventListener('dragover', handleDragOver);
  //       column.removeEventListener('dragleave', handleDragLeave);
  //       column.removeEventListener('drop', handleDrop);
  //     });
  //   };
  // }, []);

  {/* TODO O CODIGO ACIMA FOI SUBSTITUIDO POR FUNCOES NATIVAS DO REACT*/}
   
  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // necessário para permitir que o "Drop" aconteça.
  };

  const handleDrop = (targetStatus: ActivityStatus) => {
    if (!draggingId) return;

    const activityToUpdate = activities.items.find(item => item.id === draggingId);
    
    if (activityToUpdate && activityToUpdate.status !== targetStatus) {
      activityToUpdate.status = targetStatus; // altera o status da tarefa para a nova coluna.
      setRenderTrigger(prev => prev + 1); // atualiza a tela e salva.
    }
    setDraggingId(null); // reseta o estado.  
  };

  // em vez de mover o HTML usando appendChild, descobrimos o id do cartão arrastado (handleDragStart) e, quando você o solta em cima de uma coluna (handleDrop), alteramos a propriedade ".status" desse objeto na lista. O React redesenha o cartão no lugar certo.

  const handleToggleForm = (status: ActivityStatus) => {
    if (activeInlineFormColumn === status) {
      setActiveInlineFormColumn(null);
    } else {
      setActiveInlineFormColumn(status);
      setForm({
        title: '',
        day: String(new Date().getDate()),
        time: '09:00',
        description: '',
      });
    }
  };

  // o formulário gigante que ficava fixo no topo sumiu; só clicar no "+" de uma coluna e o formulário abre dentro dela.

 {/*PARA SALVAR A TAREFA DO CARD*/}

  const handleInlineSubmit = (event: React.FormEvent, status: ActivityStatus) => {
    event.preventDefault();

    const newActivity = {
      id: crypto.randomUUID(), // cria um identificador único universal por segurança.
      title: form.title.trim(),
      day: Number(form.day),
      time: form.time,
      description: form.description.trim(),
      status: status, // define automaticamente o status baseado na coluna onde foi criado.
    };

    activities.items.push(newActivity);
    setForm({ title: '', day: String(new Date().getDate()), time: '09:00', description: '' });
    setActiveInlineFormColumn(null); // fecha o formulário.
    setRenderTrigger(prev => prev + 1); // renderiza e salva.
  };

  const handleDeleteActivity = (id: string, event: React.MouseEvent) => {
    event.stopPropagation(); // evita bugs caso o clique disparasse o arrastar do cartão.

    const index = activities.items.findIndex(item => item.id === id);
    if (index !== -1) {
      activities.items.splice(index, 1); // remove o item da array.
      setRenderTrigger(prev => prev + 1); // atualiza a interface e salva no LocalStorage.
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      {/*BOX PRINCIPAL TOTALMENTE MODIFICADA COM OS TOPICOS DE DRAG & DROP*/}
      <main id="box">

        {/* TypeScript do botao de filtro */}
        <div className="dropdown-filter" style={{ alignSelf: 'flex-start' }}>
          <input type="checkbox" id="meu-filtro-toggle" className="dropdown-toggle" />
          <label htmlFor="meu-filtro-toggle" className="dropdown-button">
            FILTROS
          </label>
          <div className="dropdown-menu">
            <label className="dropdown-item"><input type="checkbox" name="categoria"/> PROJETO "X"</label>
            <label className="dropdown-item"><input type="checkbox" name="categoria"/> PROJETO "Y"</label>
            <label className="dropdown-item"><input type="checkbox" name="categoria"/> MAIS RECENTES</label>
            <label className="dropdown-item"><input type="checkbox" name="categoria"/> ATRASADAS</label>
          </div>
        </div>

        {/* Container modficado com funcoes novas */}
        <div className="Tarefas" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          {columnsData.map(({ status, items }, index) => (
            <div 
              className="tarefas-column" 
              data-id={String(index + 1)} 
              key={status}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(status)}
            >
              <div className="tarefas-title">
                <h2>{status}</h2>
                <button className="add-card" onClick={() => handleToggleForm(status)}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              {activeInlineFormColumn === status && (
                <div className="inline-form-wrapper">
                  <button type="button" className="close-inline-form" onClick={() => setActiveInlineFormColumn(null)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  
                  <form className="inline-activity-form" onSubmit={(e) => handleInlineSubmit(e, status)}>
                    <input
                      className="inline-input-full"
                      value={form.title}
                      onChange={(event) => setForm({ ...form, title: event.target.value })}
                      placeholder="Título da atividade"
                      required
                    />
                    <div className="inline-form-row">
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
                    </div>
                    <textarea
                      value={form.description}
                      onChange={(event) => setForm({ ...form, description: event.target.value })}
                      placeholder="Descrição"
                      required
                    />
                    <button type="submit" className="submit-inline-btn">Salvar Cartão</button>
                  </form>
                </div>
              )}
              
              <div className="tarefas-cards">
                {items.map((activity) => (
                  <article // adição das propriedades de drag & drop.
                    className={`tarefas-card ${draggingId === activity.id ? 'dragging' : ''}`} 
                    key={activity.id}
                    draggable="true"
                    onDragStart={() => handleDragStart(activity.id)}
                    onDragEnd={() => setDraggingId(null)}
                  >
                    <div className="card-top-row">
                      <span className="badge medium">Dia {activity.day}</span>
                      <button 
                        className="delete-card-btn" 
                        onClick={(e) => handleDeleteActivity(activity.id, e)}
                        title="Apagar atividade"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>

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
