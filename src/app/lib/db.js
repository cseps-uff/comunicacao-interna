// Arquivo: lib/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function abrirBanco() {
  // Abre a conexão com o arquivo tarefas.db
  // Se o arquivo não existir, ele será criado automaticamente na raiz do projeto.
  const db = await open({
    filename: './tarefas.db',
    driver: sqlite3.Database
  });

  // Garante que a tabela exista antes de fazermos qualquer coisa
  await db.exec(`
    CREATE TABLE IF NOT EXISTS historico_tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      status TEXT,
      criada_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      notificado BOOLEAN DEFAULT 0
    )
  `);

  return db;
}