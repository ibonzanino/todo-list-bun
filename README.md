# todo‑list‑bun

> Uma aplicação de lista de tarefas construída com Bun + TypeScript,
> ideal para demonstração de stack moderna, backend e deploy rápidos.

## 🚀 Visão Geral

Este projeto demonstra como construir e rodar uma API simples de "todo
list" usando **Bun**, com TypeScript, SQLite e Docker. Serve tanto como
projeto de estudo quanto como material de portfólio para recrutadores,
mostrando habilidade com runtime moderno, containers e boas práticas.

## 🛠 Tecnologias

- Backend: TypeScript
- Runtime: Bun
- Banco de dados: SQLite
- Containerização: Docker
- Configuração de deploy: `fly.toml`
- Configuração de projeto: `tsconfig.json`, `bun.lock`

## 🔧 Instalação & Execução

1.  Clone o repositório:

    ```bash
    git clone https://github.com/ibonzanino/todo-list-bun.git
    cd todo-list-bun
    ```

2.  Instale as dependências:

    ```bash
    bun install
    ```

3.  Execute:

    ```bash
    bun run ./src/index.ts
    ```

4.  Docker:

    ```bash
    docker build -t todo-list-bun .
    docker run -p 3000:3000 todo-list-bun
    ```

## 🎯 Funcionalidades

- CRUD de tarefas
- Execução rápida com Bun
- Docker + SQLite
- Deploy preparado para Fly.io

## 🧭 Arquitetura

- `index.ts`
- `src/`
- `todo.sqlite`
- `Dockerfile`
- `fly.toml`

## 📌 Melhorias futuras

- Autenticação
- Testes automatizados
- Deploy de produção
- Documentação de endpoints

## ✉️ Contato

Igor Bonzanino --- https://github.com/ibonzanino

## 📝 Licença

MIT
