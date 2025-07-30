FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY turbo.json ./
COPY apps/backoffice/package*.json ./apps/backoffice/
COPY packages/ ./packages/

# Instalar dependências
RUN npm install

# Copiar código da aplicação
COPY apps/backoffice/ ./apps/backoffice/

# Build da aplicação
WORKDIR /app/apps/backoffice
RUN npm run build

# Expor porta
EXPOSE 3001

# Comando para iniciar
CMD ["npm", "run", "start"] 