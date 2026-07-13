import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Pega o prompt enviado pela caixinha de texto do site
    const { prompt } = await request.json();

    // 2. Define o endereço exato do seu Ollama rodando no notebook vermelho
    const urlOllama = 'http://192.168.0.184:11435/api/chat';

    // 3. Dispara a requisição para a IA local
    const response = await fetch(urlOllama, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2:1b', // Modelo leve baixado para rodar em 4GB de RAM
        messages: [
          { role: 'user', content: prompt }
        ],
        stream: false, // Mantém desativado para processar o texto completo de uma vez
      }),
    });

    if (!response.ok) {
      throw new Error('O Ollama respondeu com um erro.');
    }

    const data = await response.json();
    
    // 4. Retorna o texto gerado pela IA de volta para o front-end
    return NextResponse.json({ resultado: data.message.content });

  } catch (error) {
    console.error("Erro na rota de integração com o Ollama:", error);
    return NextResponse.json(
      { erro: 'Não foi possível se comunicar com a IA local no momento.' }, 
      { status: 500 }
    );
  }
}