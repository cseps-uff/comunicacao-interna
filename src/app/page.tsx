"use client"; // Essa diretiva é necessária no Next.js pois temos interatividade na tela (clicks e estados)

import { useState } from "react";
import Link from "next/link";

export default function TaskMasterApp() {
  // O useState substitui a lógica do app.ts para controlar qual tela está ativa
  const [activeView, setActiveView] = useState("home-view");


/* AQUI SÓ BAGUNÇA, em algum momento vou arrumar, vai ser a newsletter */



  return (
    <>
      <div className="main-layout">
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
        </main>
      </div>
      {/*============================================*/}
      {/* essa div é enorme, inclui tudo que é do menu principal */}
    </>
  );
}

