FROM node:20

WORKDIR /app

# Copia arquivos da raiz do monorepo
COPY package*.json ./
COPY tsconfig.json ./
COPY packages ./packages
COPY apps/api ./apps/api

# Instala dependências na raiz (monorepo)
RUN npm install

# Builda a API
WORKDIR /app/apps/api
RUN npx prisma generate

RUN npm run build

EXPOSE 3000 5555

CMD npm run setup 