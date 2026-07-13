import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const urlOllama = 'http://192.168.0.184:11435/api/chat';

    const response = await fetch(urlOllama, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:1b',
        messages: [{ role: 'user', content: prompt }],
        stream: true, // 🟢 ATIVADO! Agora ele manda pedaço por pedaço
      }),
    });

    if (!response.ok) throw new Error('Erro no Ollama');

    // Cria um canal de resposta contínua (TransformStream) para o front-end ler em tempo real
    const transformStream = new TransformStream();
    const writer = transformStream.writable.getWriter();
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    // Processa o fluxo vindo do Ollama e limpa o formato JSON dele deixando só o texto puro
    (async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          // O Ollama envia linhas separadas por \n contendo objetos JSON
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.trim() !== '') {
              const parsed = JSON.parse(line);
              const content = parsed.message?.content || '';
              if (content) {
                await writer.write(new TextEncoder().encode(content));
              }
            }
          }
        }
      } catch (err) {
        console.error("Erro no processamento do Stream:", err);
      } finally {
        await writer.close();
      }
    })();

    return new NextResponse(transformStream.readable);

  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json({ erro: 'Falha na IA' }, { status: 500 });
  }
}