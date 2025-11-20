# ⚡ Bun Todo API (Native SQLite)

![Bun](https://img.shields.io/badge/Runtime-Bun_v1.0+-black?style=for-the-badge&logo=bun&logoColor=white)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Fly.io](https://img.shields.io/badge/Deploy-Fly.io-purple?style=for-the-badge&logo=fly.io&logoColor=white)

> Uma API REST de alta performance construída com **Bun** e **SQLite Nativo** (`bun:sqlite`), configurada para deploy em containers com persistência de dados via Volumes.

---

## 📖 Sobre o Projeto

Este projeto é o Backend de uma aplicação de Lista de Tarefas. Ele foi desenvolvido focando em simplicidade e velocidade, removendo camadas de complexidade desnecessárias (como ORMs pesados) e utilizando os recursos nativos do runtime Bun.

### 🚀 Destaques Técnicos

- **Bun Native Server:** Utiliza `Bun.serve` para máxima performance HTTP.
- **Zero-ORM:** Consultas SQL diretas e otimizadas usando `bun:sqlite` com modo WAL ativado.
- **Stateful Architecture:** Configurado para rodar no **Fly.io** utilizando Volumes persistentes para o banco de dados SQLite.
- **CORS Enabled:** Configurado para aceitar requisições de qualquer origem (frontend desacoplado).

---

## 🛠️ Tecnologias

- **Runtime:** [Bun](https://bun.sh/)
- **Linguagem:** TypeScript
- **Database:** SQLite (Native Bun Driver)
- **Infra:** Docker & Fly.io

---

## 🔌 API Endpoints

A API roda nativamente na porta **3000** e aceita/retorna JSON.

| Método   | Rota         | Descrição               | Corpo (JSON)                               |
| :------- | :----------- | :---------------------- | :----------------------------------------- |
| `GET`    | `/tasks`     | Lista todas as tarefas  | N/A                                        |
| `GET`    | `/tasks/:id` | Busca uma tarefa por ID | N/A                                        |
| `POST`   | `/tasks`     | Cria uma nova tarefa    | `{ "title": "...", "description": "..." }` |
| `PUT`    | `/tasks/:id` | Atualiza uma tarefa     | `{ "title": "...", "isCompleted": true }`  |
| `DELETE` | `/tasks/:id` | Remove uma tarefa       | N/A                                        |

---

## 💾 Estrutura do Banco de Dados

O banco de dados é criado automaticamente na inicialização se não existir.

**Tabela:** `tasks`

- `id`: INTEGER PRIMARY KEY AUTOINCREMENT
- `title`: TEXT (Obrigatório)
- `description`: TEXT
- `isCompleted`: INTEGER (0 ou 1, mapeado para boolean)
- `createdAt`: TEXT (Timestamp automático)

---

## 🚀 Rodando Localmente

### Pré-requisitos

- [Bun](https://bun.sh/) instalado.

### Passo a Passo

1.  **Instale as dependências:**

    ```bash
    bun install
    ```

2.  **Inicie o servidor:**
    ```bash
    bun run src/index.ts
    ```
    _O servidor iniciará em `http://localhost:3000` e criará o arquivo `todo.sqlite` na raiz._

---

## 🐳 Rodando com Docker

O projeto inclui um `Dockerfile` otimizado.

```bash
# Construir a imagem
docker build -t bun-todo-api .

# Rodar o container
docker run -p 3000:3000 bun-todo-api
```

---

## ☁️ Deploy no Fly.io (Com Persistência)

Este projeto está configurado para usar **Volumes** do Fly.io, garantindo que o arquivo SQLite não seja perdido ao reiniciar o servidor.

### Configuração (`fly.toml`)

O arquivo `fly.toml` já está configurado para montar o volume `sqlite_data` no diretório `/data`.

1.  **Login e Launch (se for o primeiro deploy):**

    ```bash
    fly launch --no-deploy
    ```

2.  **Criar o Volume (Importante):**
    Você precisa criar um volume com o nome definido no `fly.toml` (`sqlite_data`).

    ```bash
    fly volumes create sqlite_data --region gru --size 1
    ```

3.  **Deploy:**
    ```bash
    fly deploy
    ```

A aplicação usará automaticamente o caminho `/data/todo.sqlite` quando detectar o ambiente de produção.

---

## 📁 Estrutura de Pastas

```
.
├── src/
│   ├── db/
│   │   └── db.ts            # Conexão SQLite e Schema
│   ├── services/
│   │   └── taskService.ts   # Lógica de Negócio (CRUD SQL)
│   └── index.ts             # Servidor HTTP e Rotas
├── Dockerfile               # Configuração da Imagem
├── fly.toml                 # Configuração de Deploy
├── package.json             # Dependências
├── tsconfig.json            # Configuração TypeScript
└── todo.sqlite              # Banco de dados (gerado localmente)
```

---

Desenvolvido com 💜 e **Bun**.
