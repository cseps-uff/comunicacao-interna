// Arquivo: app/api/tarefas/route.js
import { NextResponse } from 'next/server';
import { abrirBanco } from '../../../lib/db';

// GET: Retorna o histórico de todas as tarefas
export async function GET() {
  const db = await abrirBanco();
  
  // Puxa todas as tarefas, ordenando das mais novas para as mais velhas
  const tarefas = await db.all('SELECT * FROM historico_tarefas ORDER BY id DESC');
  
  return NextResponse.json(tarefas);
}

// POST: Cria uma nova tarefa no banco
export async function POST(request) {
  const corpo = await request.json();
  const db = await abrirBanco();

  // Insere a nova tarefa na tabela
  const resultado = await db.run(
    'INSERT INTO historico_tarefas (titulo, status) VALUES (?, ?)',
    [corpo.titulo, 'pendente']
  );

  return NextResponse.json({ 
    sucesso: true, 
    mensagem: 'Tarefa criada!',
    idTarefa: resultado.lastID 
  });
}