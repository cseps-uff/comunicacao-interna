import "./calend.css";

// Função para obter o número de dias do mês atual
function getDaysInCurrentMonth(): number{
    const actualMonth = new Date().getMonth() + 1; // Obter o mês atual (0-11, então adicionamos 1)
    const actualYear = new Date().getFullYear(); // Obter o ano atual
    
    return new Date(actualYear, actualMonth, 0).getDate();
}


function getDay(){
    return new Date().getDate();
}


export default function Grid(){
    const daysInMonth = getDaysInCurrentMonth();

    const days = [];

    //Gera os dias do mês de acordo com o mês atual automaticamente
    for (let i = 1; i <= daysInMonth; i++){
        days.push(
        <div className="day" { ...(i === getDay()) ? {id: "actual-day"} : {} }>
            <span className="n-day">{i}</span>

            {/*Botão de criar nova tarefa(canto superior direito do dia)*/}
            <button className="add-event" popoverTarget={`card-day-${i}`}> + </button>

            {/*
            Section que irá conter o card.
            A princípio, ele ficará oculto até o usuário clicar no botão de adicionar tarefa
            */}
            <section id={`card-day-${i}`} className="card-task" popover="auto">
                <div className="card-header">
                    <span className="card-title">Adicionar tarefa no dia {i}</span>
                    <button id="close-card"
                    popoverTarget={`card-day-${i}`}
                    popoverTargetAction="hide"
                    aria-label="fechar tarefa">
                        &times;

                    </button>
                </div>

                <form>
                    <div className="input-group">
                        <label htmlFor={`task-name-${i}`}>Tarefa: </label>
                        <input type="text" placeholder="Nome da tarefa"
                        className='task-name' required autoFocus/>
                    </div>
                
                    <div className="input-group">
                        <label htmlFor={`task-description-${i}`}>Descrição: </label>
                        <input type="text" placeholder="Descrição da tarefa" className='task-description' required/>
                    </div>

                    <div className="input-group">
                        <label htmlFor={`task-priority-${i}`}>Prioridade: </label>
                        <select className='task-priority' required>
                            <option value="low">Baixa &#x1F7E2;</option>
                            <option value="medium">Média &#x1F7E1;</option>
                            <option value="high">Alta &#x1F534;</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor={`data-${i}`}>Data Limite:</label>
                        <input type="date" id={`data-${i}`} name="due-date" />
                    </div>

                    <div className="card-actions">
                        <button type="button" popoverTarget={`card-day-${i}`} 
                        popoverTargetAction="hide" id="cancel-button">
                            Cancelar
                        </button>
                        
                        <button type="submit" id="complete-button">Concluir</button>
                    </div>
                </form>

            </section>
        </div>
    );
    }

    return(
        <section className="calendar">
            {days}
        </section>
    );
}