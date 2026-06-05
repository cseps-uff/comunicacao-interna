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
    for (let i = 1; i <= daysInMonth; i++){
        days.push(
        <div className="day" { ...(i === getDay()) ? {id: "actual-day"} : {} }>
            <span className="n-day">{i}</span>
            <span className="add-event"> + </span>
        </div>
    );
    }

    return(
        <section className="calendar">
            {days}
        </section>
    );
}