FROM oven/bun:1

WORKDIR /app

# Copia os arquivos
COPY . .

# Instala dependências
RUN bun install

# Cria a pasta onde o banco vai ficar (apenas por garantia)
RUN mkdir -p /data

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar
CMD ["bun", "run", "src/index.ts"]