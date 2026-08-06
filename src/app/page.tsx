"use client"; // Essa diretiva é necessária no Next.js pois temos interatividade na tela (clicks e estados)

import { useState } from "react";
import Link from "next/link"; 

// --- SIMULAÇÃO DE BANCO DE DADOS ---
async function fetchWeekStatusFromDB(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("tem duas tarefas pendentes uma para segunda a outra para quarta.");
    }, 600); // Simulando 600ms de tempo de resposta do servidor
  });
}

// Tipagem para as mensagens do chat
type ChatMessage = {
  id: number;
  role: "user" | "bot";
  content: string;
};

export default function Newsletter() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Ação do primeiro botão: Como está a semana
  const handleComoEstaASemana = async () => {
    // 1. Adiciona a pergunta do usuário no chat
    const userMessage: ChatMessage = { id: Date.now(), role: "user", content: "Como está a semana?" };
    setMessages((prev) => [...prev, userMessage]);
    
    // 2. Mostra estado de "carregando/digitando"
    setIsTyping(true);

    try {
      // 3. Busca a resposta no banco de dados (simulado)
      const dbResponse = await fetchWeekStatusFromDB();
      
      // 4. Adiciona a resposta do bot na tela
      const botMessage: ChatMessage = { id: Date.now() + 1, role: "bot", content: dbResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao buscar dados do BD", error);
    } finally {
      setIsTyping(false);
    }
  };

  // Ação para o botão de tasks pendentes
  const handleTasksPendentes = () => {
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: "Tasks pendentes" }]);
    // Aqui você integraria a chamada do BD para as tasks
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {fazendoBomDia()}
      </h1>

      {/* BLOCO ARREDONDADO E MAIS ESCURO (FAKE CHAT) */}
      <div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex flex-col">
        
        {/* Área de exibição das mensagens */}
        <div className="h-80 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-800">
          {messages.length === 0 && (
            <p className="text-gray-400 text-sm text-center mt-auto mb-auto">
              Nenhuma mensagem ainda. Inicie uma interação!
            </p>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white self-end rounded-br-none"
                  : "bg-gray-700 text-gray-100 self-start rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {/* Indicador visual de que o "Bot" está processando a chamada ao BD */}
          {isTyping && (
            <div className="bg-gray-700 text-gray-400 self-start p-3 rounded-2xl rounded-bl-none text-sm flex gap-1 items-center">
              <span className="animate-pulse">●</span>
              <span className="animate-pulse delay-75">●</span>
              <span className="animate-pulse delay-150">●</span>
            </div>
          )}
        </div>

        {/* Área dos Botões (Rodapé do Chat) - Botão enviar removido */}
        <div className="bg-gray-900 p-4 flex flex-wrap gap-2 justify-center border-t border-gray-700">
          <button
            onClick={handleComoEstaASemana}
            disabled={isTyping}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium py-2 px-4 rounded-full border border-gray-600 transition-colors disabled:opacity-50"
          >
            Como está a semana
          </button>
          
          <button
            onClick={handleTasksPendentes}
            disabled={isTyping}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium py-2 px-4 rounded-full border border-gray-600 transition-colors disabled:opacity-50"
          >
            Tasks pendentes
          </button>
        </div>
      </div>
      
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