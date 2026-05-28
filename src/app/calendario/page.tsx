import Grid from "./grid";

const currentMonth = new Date().getMonth();

function getMonthName(month: number): string {
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return monthNames[month];
};

export default function Calendario(){
    return (
        <main id="box">
            <section id="header">
                <span className="arrow"> &lt; </span>
                <h1 id="title">{getMonthName(currentMonth)}</h1>
                <span className="arrow"> &gt; </span>
            </section>
            <Grid />
        </main>
    );
}