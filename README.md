# Nine Line - Monorepo

Este é um monorepo gerenciado com Turborepo que contém múltiplas aplicações e pacotes compartilhados.

## 📁 Estrutura do Projeto

```bash
nine-line/
├── apps/                    # Aplicações
│   ├── api/                # API Backend (Port 3333)
│   ├── backoffice/         # Interface Admin (Port 3001)
│   └── web/                # Aplicação Web (Port 3000)
├── packages/               # Pacotes compartilhados
│   ├── config/            # Configurações centralizadas
│   │   ├── eslint/        # Configurações ESLint
│   │   ├── tsconfig/      # Configurações TypeScript
│   │   └── nginx/         # Configurações Nginx
│   └── ui/                # Componentes UI compartilhados
```

## 🌐 Aplicações Web

| Aplicação      | Porta | Descrição        | URL                     |
| -------------- | ----- | ---------------- | ----------------------- |
| **API**        | 3333  | Backend REST API | <http://localhost:3333> |
| **Backoffice** | 3001  | Interface Admin  | <http://localhost:3001> |
| **Web**        | 3000  | Aplicação Web    | <http://localhost:3000> |
| **Nginx**      | 80    | Proxy Reverso    | <http://localhost>      |

## 🚀 Desenvolvimento

### Pré-requisitos

- Node.js 20+
- Docker & Docker Compose
- npm

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente (opcional)
# A aplicação web usa variáveis de ambiente definidas no docker-compose.yml
# Para desenvolvimento local, você pode criar:
# cp apps/api/.env.example apps/api/.env
# cp apps/backoffice/.env.example apps/backoffice/.env
```

### Scripts Disponíveis

```bash
# Desenvolvimento local
npm run dev                    # Todas as aplicações
npm run dev --filter=api      # Apenas API
npm run dev --filter=backoffice # Apenas Backoffice
npm run dev --filter=web      # Apenas Web

# Build
npm run build                 # Todas as aplicações
npm run build --filter=api    # Apenas API

# Linting
npm run lint                  # Todas as aplicações
npm run lint --filter=api     # Apenas API

# Type checking
npm run check-types           # Todas as aplicações
```

## 🐳 Desenvolvimento com Docker

### Scripts Docker

```bash
# Iniciar todos os serviços
npm run dev:docker

# Iniciar em background
npm run dev:docker:detached

# Parar serviços
npm run docker:down

# Ver logs
npm run docker:logs
```

### Serviços Docker

| Serviço        | Porta | Descrição       |
| -------------- | ----- | --------------- |
| **db**         | 5432  | PostgreSQL      |
| **redis**      | 6379  | Redis Cache     |
| **api**        | 3333  | API Backend     |
| **backoffice** | 3001  | Interface Admin |
| **web**        | 3000  | Aplicação Web   |
| **nginx**      | 80    | Proxy Reverso   |

### URLs com Nginx

| Aplicação      | URL                       | Descrição           |
| -------------- | ------------------------- | ------------------- |
| **Backoffice** | <http://localhost>        | Interface principal |
| **Web**        | <http://localhost/web>    | Aplicação Web       |
| **API**        | <http://localhost/api>    | Backend             |
| **Health**     | <http://localhost/health> | Status dos serviços |

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime
- **TypeScript** - Linguagem
- **Express** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **Redis** - Cache

### Frontend

- **Next.js** - Framework React
- **TypeScript** - Linguagem
- **Tailwind CSS** - Framework CSS
- **React** - Biblioteca UI

### DevOps

- **Docker** - Containerização
- **Nginx** - Proxy reverso
- **Turborepo** - Gerenciamento de monorepo

## 📦 Estrutura de Desenvolvimento

### Pacotes Compartilhados

- **`@nine-line/eslint`** - Configurações ESLint
- **`@nine-line/tsconfig`** - Configurações TypeScript
- **`@nine-line/ui`** - Componentes UI
- **`@nine-line/config/nginx`** - Configurações Nginx

### Padronização

- **ESLint**: Configurações centralizadas por tipo de projeto
- **TypeScript**: Configurações base estendidas por projeto
- **UI**: Componentes reutilizáveis com Tailwind CSS
- **Nginx**: Configuração centralizada para proxy reverso

## 📝 Notas Importantes

### Configurações Centralizadas

- **ESLint**: Configurações em `packages/config/eslint/`
- **TypeScript**: Configurações em `packages/config/tsconfig/`
- **Nginx**: Configurações em `packages/config/nginx/`
- **UI**: Componentes em `packages/ui/`

### Variáveis de Ambiente

- **API**: `apps/api/.env` (obrigatório)
- **Backoffice**: `apps/backoffice/.env` (obrigatório)
- **Web**: Definidas no `docker-compose.yml` (automático)

### Desenvolvimento

1. **Local**: Use `npm run dev` para desenvolvimento local
2. **Docker**: Use `npm run dev:docker` para ambiente containerizado
3. **Nginx**: Proxy reverso para roteamento de aplicações

## 🔧 Troubleshooting

### Problemas Comuns

1. **Porta já em uso**: Verifique se não há outros serviços rodando
2. **Dependências**: Execute `npm install` na raiz
3. **Docker**: Use `docker-compose down` e `docker-compose up --build`
4. **Nginx**: Verifique logs com `docker-compose logs nginx`
5. **Arquivos .env**: A aplicação web não precisa de arquivo .env (usa variáveis do docker-compose)

### Logs

```bash
# Ver logs de todos os serviços
docker-compose logs

# Ver logs específicos
docker-compose logs api
docker-compose logs backoffice
docker-compose logs web
docker-compose logs nginx
```
