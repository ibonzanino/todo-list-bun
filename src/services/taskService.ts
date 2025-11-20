import db from "../db/db";

// Definimos a interface manualmente agora (já que não temos Prisma)
export interface Task {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: string;
}

// Helper para converter 1/0 do SQLite para true/false
function mapTask(row: any): Task {
  return {
    ...row,
    isCompleted: Boolean(row.isCompleted), // Converte 1 -> true, 0 -> false
  };
}

// --- CREATE ---
export function createTask(title: string, description?: string): Task {
  // $1, $2 são os placeholders para evitar SQL Injection
  const query = db.query(`
    INSERT INTO tasks (title, description) 
    VALUES ($title, $description) 
    RETURNING *
  `);

  // .get() executa e retorna a primeira linha inserida
  const row = query.get({ $title: title, $description: description || null });
  return mapTask(row);
}

// --- READ ALL ---
export function getAllTasks(): Task[] {
  const query = db.query(`SELECT * FROM tasks ORDER BY createdAt DESC`);
  const rows = query.all(); // .all() retorna um array
  return rows.map(mapTask);
}

// --- READ ONE ---
export function getTaskById(id: number): Task | null {
  const query = db.query(`SELECT * FROM tasks WHERE id = $id`);
  const row = query.get({ $id: id });
  return row ? mapTask(row) : null;
}

// --- UPDATE ---
export function updateTask(id: number, data: Partial<Task>): Task {
  // Montamos a query dinamicamente dependendo do que veio para atualizar
  const fields = [];
  const params: any = { $id: id };

  if (data.title !== undefined) {
    fields.push("title = $title");
    params.$title = data.title;
  }
  if (data.description !== undefined) {
    fields.push("description = $description");
    params.$description = data.description;
  }
  if (data.isCompleted !== undefined) {
    fields.push("isCompleted = $isCompleted");
    params.$isCompleted = data.isCompleted ? 1 : 0; // Convertendo volta para SQLite
  }

  if (fields.length === 0) throw new Error("Nenhum dado para atualizar");

  const sql = `
    UPDATE tasks 
    SET ${fields.join(", ")} 
    WHERE id = $id 
    RETURNING *
  `;

  const row = db.query(sql).get(params);

  if (!row) throw new Error("Tarefa não encontrada");
  return mapTask(row);
}

// --- DELETE ---
export function deleteTask(id: number): void {
  const query = db.query(`DELETE FROM tasks WHERE id = $id`);
  query.run({ $id: id });
}
