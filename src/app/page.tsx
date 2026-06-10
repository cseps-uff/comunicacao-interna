"use client";
{/* Esse foi o primeiro teste aplicado do qwin3.6 */}
import { useState } from "react";
import './newslatter.css';

export default function Newsletter() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviado:", inputValue);
    // Add your submission logic here
    setInputValue("");
  };

  return (
    <div className="main#box">
      <h1>{fazendoBomDia()}</h1>
      <hr />
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rerum corrupti, maiores nisi aut vitae placeat sequi sed quia voluptate deserunt earum eos eum. Necessitatibus, fugiat. Quam esse officiis iusto.</p>
      <br />
      <form onSubmit={handleSubmit} className="ollama-input-container">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="ollama-input"
          required
        />
        <button type="submit" className="ollama-button">Enviar</button>
      </form>
    </div>
  );
}

function fazendoBomDia() {
  const horaAtual: number = new Date().getHours();
  if (horaAtual >= 0 && horaAtual < 12) return "Bom dia!";
  else if (horaAtual >= 12 && horaAtual < 18) return "Boa tarde!";
  else return "Boa noite!";
}
function notificaNovaTask(){

}