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

# Construir o pacote UI primeiro
WORKDIR /app/packages/ui
RUN npm run build

# Voltar para a aplicação backoffice e construir
WORKDIR /app/apps/backoffice
RUN npm run build

# Expor porta
EXPOSE 3001

# Comando para iniciar
CMD ["npm", "run", "start"] 