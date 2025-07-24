FROM node:20

WORKDIR /app

# Copia arquivos da raiz do monorepo
COPY package*.json ./
COPY tsconfig.json ./
COPY packages ./packages
COPY apis/pool-appointment-api ./apis/pool-appointment-api

# Instala dependências na raiz (monorepo)
RUN npm install

# Builda a API
WORKDIR /app/apis/pool-appointment-api
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# Entrypoint customizado para rodar setup completo antes de iniciar
CMD npm run setup 