"use client"; // Essa diretiva é necessária no Next.js pois temos interatividade na tela (clicks e estados)

import { useState } from "react";
import Link from "next/link"; 
export default function Newsletter() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {fazendoBomDia()}
      </h1>
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