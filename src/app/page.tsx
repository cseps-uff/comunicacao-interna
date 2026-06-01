"use client"; // Essa diretiva é necessária no Next.js pois temos interatividade na tela (clicks e estados)

import { useState } from "react";
import Link from "next/link";
import './newslatter.css';

export default function Newsletter() {
  return (
    <div className="main#box">
      <h1>{fazendoBomDia()}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rerum corrupti, maiores nisi aut vitae placeat sequi sed quia voluptate deserunt earum eos eum. Necessitatibus, fugiat. Quam esse officiis iusto.</p>
    </div>
  );
}
function fazendoBomDia() {
  const horaAtual: number = new Date().getHours();
  if (horaAtual >= 0 && horaAtual < 12) {
      return "Bom dia!";
    } else if (horaAtual >= 12 && horaAtual < 18) {
      return "Boa tarde!";
    } else {
      return "Boa noite!";
    }
}
