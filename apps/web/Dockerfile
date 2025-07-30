FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY turbo.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/ ./packages/

# Instalar dependências
RUN npm install

# Copiar código da aplicação
COPY apps/web/ ./apps/web/

# Build da aplicação
WORKDIR /app/apps/web
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "run", "start"] 