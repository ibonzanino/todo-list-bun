// src/db/db.ts
import { Database } from "bun:sqlite";

// Define o caminho: Usa a variável de ambiente OU cria na raiz (local)
const dbPath = process.env.DB_PATH || "todo.sqlite";

const db = new Database(dbPath, { create: true });

db.query("PRAGMA journal_mode = WAL;").run();

db.query(
  `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    isCompleted INTEGER DEFAULT 0,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );
`
).run();

export default db;
