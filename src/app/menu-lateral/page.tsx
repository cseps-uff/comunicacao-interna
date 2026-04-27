import Link from "next/link";
export default function Menu(){
    return(
        <div className="main-layout">
            <aside className="sidebar">
            <h3>Menu lateral</h3>
                <ul className="space-list">
                    
                    <li><Link href="/tarefas">📝 Tarefas</Link></li>
                    <li><Link href="/calendario">🗓️ Calendário</Link></li>
                    <li><Link href="/dashboard">📈 Dashboard</Link></li>
                    <li><a href="https://drive.google.com/drive/folders/1l7Syo-oopkDD9_LqSzi4YY5q32plP6vd" target="_blank">📄 Drive do Capitulo</a></li>
                </ul>
            </aside>
        </div>
    )
}