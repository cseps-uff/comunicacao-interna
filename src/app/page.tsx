"use client";
// Esse foi o primeiro teste aplicado do qwin3.6
import { useState } from "react";
import './newslatter.css';

export default function Newsletter() {
  const [inputValue, setInputValue] = useState("");
  const [resposta, setResposta] = useState(""); // Guarda o texto da IA
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || carregando) return;

    setCarregando(true);
    setResposta(""); // Limpa a resposta anterior antes de começar a receber a nova
    const promptAtual = inputValue;
    setInputValue(""); // Limpa o input logo após o envio

    try {
      // 1. Chama a rota de API interna do Next.js
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptAtual }),
      });

      if (!response.body) {
        throw new Error("O servidor não retornou um fluxo de dados (stream).");
      }

      // 2. Cria o leitor do fluxo de texto (Stream Reader)
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let resultadoFinal = "";

      // 3. Loop que lê cada pedacinho da palavra assim que o Ollama solta ela
      while (true) {
        const { value, done } = await reader.read();
        if (done) break; // Se terminou o texto, sai do loop

        // Transforma o pedaço binário em texto legível
        const pedacoTexto = decoder.decode(value, { stream: true });
        resultadoFinal += pedacoTexto;

        // Atualiza o estado em tempo real para o usuário ver digitando!
        setResposta(resultadoFinal);
      }

    } catch (error) {
      console.error(error);
      setResposta("Erro ao conectar-se ao servidor da IA.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="main-box"> {/* Corrigido de main#box para main-box para evitar problemas no CSS */}
      <h1>{fazendoBomDia()}</h1>
      <hr />
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est rerum corrupti, maiores nisi aut vitae placeat sequi sed quia voluptate deserunt earum eos eum. Necessitatibus, fugiat. Quam esse officiis iusto.</p>
      <br />
      
      <form onSubmit={handleSubmit} className="ollama-input-container">
        <input
          type="text"
          placeholder={carregando ? "A IA está pensando..." : "Digite sua mensagem..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="ollama-input"
          disabled={carregando}
          required
        />
        <button type="submit" className="ollama-button" disabled={carregando}>
          {carregando ? "..." : "Enviar"}
        </button>
      </form>

      {/* Renderiza a caixinha de resposta se houver algum texto sendo gerado */}
      {resposta && (
        <div className="ollama-resposta-container" style={{ marginTop: '20px', padding: '15px', background: '#222', borderRadius: '8px', textAlign: 'left' }}>
          <strong style={{ color: '#2563eb' }}>Resposta da IA:</strong>
          <p style={{ whiteSpace: 'pre-line', marginTop: '10px', color: '#fff' }}>{resposta}</p>
        </div>
      )}
    </div>
  );
}

function fazendoBomDia() {
  const horaAtual: number = new Date().getHours();
  if (horaAtual >= 0 && horaAtual < 12) return "Bom dia!";
  else if (horaAtual >= 12 && horaAtual < 18) return "Boa tarde!";
  else return "Boa noite!";
}