"use client"; // Essa diretiva é necessária no Next.js pois temos interatividade na tela (clicks e estados)

import { useState } from "react";
import Link from "next/link";

export default function Newsletter() {
  return (
    <main className="area-conteudo">
      <article className="cartao-texto texto-corrido">
        <h1>Título do seu Documento</h1>
        <p>Aqui começa o seu texto corrido. Ele vai ter um tamanho de fonte excelente para leitura e não vai encostar nas bordas.</p>
        <p>O segundo parágrafo terá uma distância confortável do primeiro, graças à margem inferior aplicada na tag p. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quae necessitatibus dolorem mollitia nisi expedita laboriosam vitae sequi autem? Consequatur quaerat aliquid minus quae est iure beatae! Distinctio, quibusdam quaerat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime id obcaecati, totam deserunt non inventore optio voluptates, eaque soluta quidem fugit repellat quos porro et modi, ex voluptate sint! Nobis? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non blanditiis beatae voluptatibus optio velit sunt odio labore in doloremque dolores quia eum, impedit, modi maxime, nesciunt inventore pariatur libero hic.</p>
      </article>
    </main>
  );
}

