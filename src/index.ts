import { serve } from "bun";
import * as taskService from "./services/taskService";
import type { Task } from "./services/taskService";

const PORT = 3000;

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;
    const idMatch = path.match(/^\/tasks\/(\d+)$/);

    // ✅ HEADERS DE CORS COMPLETOS
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // ✅ TRATAMENTO DO PREFLIGHT (OPTIONS)
    if (method === "OPTIONS") {
      return new Response(null, { headers });
    }

    try {
      // 1. GET /tasks
      if (method === "GET" && path === "/tasks") {
        const tasks = taskService.getAllTasks();
        return new Response(JSON.stringify(tasks), { headers });
      }

      // 2. POST /tasks
      if (method === "POST" && path === "/tasks") {
        const body = (await req.json()) as {
          title: string;
          description?: string;
        };

        if (!body.title) {
          return new Response(JSON.stringify({ error: "Title required" }), {
            status: 400,
            headers,
          });
        }

        const newTask = taskService.createTask(body.title, body.description);
        return new Response(JSON.stringify(newTask), { status: 201, headers });
      }

      // 3. GET /tasks/:id
      if (method === "GET" && idMatch) {
        const id = parseInt(idMatch[1]!);

        const task = taskService.getTaskById(id);

        if (!task)
          return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers,
          });
        return new Response(JSON.stringify(task), { headers });
      }

      // 4. PUT /tasks/:id
      if (method === "PUT" && idMatch) {
        const id = parseInt(idMatch[1]!);
        const body = (await req.json()) as Partial<Task>;
        try {
          const updated = taskService.updateTask(id, body);
          return new Response(JSON.stringify(updated), { headers });
        } catch (e) {
          return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers,
          });
        }
      }

      // 5. DELETE /tasks/:id
      if (method === "DELETE" && idMatch) {
        const id = parseInt(idMatch[1]!);
        try {
          taskService.deleteTask(id);
          return new Response(null, { status: 204, headers });
        } catch (e) {
          return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers,
          });
        }
      }

      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers,
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Internal Error" }), {
        status: 500,
        headers,
      });
    }
  },
});

console.log(`🚀 Server running at http://localhost:${PORT}`);
