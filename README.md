# 9line Spaces - Monorepo

This is a Turborepo-managed monorepo containing multiple applications and shared packages for the space management and appointment booking system.

## 📁 Project Structure

```bash
nine-line/
├── apps/                    # Applications
│   ├── api/                # Backend API (Port 3333)
│   ├── backoffice/         # Admin Interface (Port 3001)
│   ├── web/                # Web Application (Port 3000)
│   └── docs/               # Documentation (Port 3001)
├── packages/               # Shared packages
│   ├── config/            # Centralized configurations
│   │   ├── eslint/        # ESLint configurations
│   │   ├── tsconfig/      # TypeScript configurations
│   │   └── nginx/         # Nginx configurations
│   └── ui/                # Shared UI components
├── .github/               # GitHub Templates & Workflows
│   ├── ISSUE_TEMPLATE/    # Issue Templates
│   ├── workflows/         # GitHub Actions
│   └── pull_request_template.md
```

## 🌐 Web Applications

| Application    | Port | Description      | URL                     |
| -------------- | ---- | ---------------- | ----------------------- |
| **API**        | 3333 | Backend REST API | <http://localhost:3333> |
| **Backoffice** | 3001 | Admin Interface  | <http://localhost:3001> |
| **Web**        | 3000 | Web Application  | <http://localhost:3000> |
| **Docs**       | 3001 | Documentation    | <http://localhost:3001> |
| **Nginx**      | 80   | Reverse Proxy    | <http://localhost>      |

## 🚀 Development

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp apps/api/.env.example apps/api/.env
cp apps/backoffice/.env.example apps/backoffice/.env

# Setup the project (migrations, seeders, RBAC)
cd apps/api && npm run setup
```

### Available Scripts

```bash
# Local development
npm run dev                    # All applications
npm run dev --filter=api      # API only
npm run dev --filter=backoffice # Backoffice only
npm run dev --filter=web      # Web only
npm run dev --filter=docs     # Docs only

# Build
npm run build                 # All applications
npm run build --filter=api    # API only

# Linting
npm run lint                  # All applications
npm run lint --filter=api     # API only

# Type checking
npm run check-types           # All applications

# Tests
npm run test                  # All tests
npm run test:coverage         # Tests with coverage
```

## 🐳 Docker Development

### Docker Scripts

```bash
# Start all services
npm run dev:docker

# Start in background
npm run dev:docker:detached

# Stop services
npm run docker:down

# View logs
npm run docker:logs
```

### Docker Services

| Service        | Port | Description     |
| -------------- | ---- | --------------- |
| **db**         | 5432 | PostgreSQL      |
| **redis**      | 6379 | Redis Cache     |
| **api**        | 3333 | Backend API     |
| **backoffice** | 3001 | Admin Interface |
| **web**        | 3000 | Web Application |
| **docs**       | 3001 | Documentation   |
| **nginx**      | 80   | Reverse Proxy   |

### URLs with Nginx

| Application    | URL                       | Description     |
| -------------- | ------------------------- | --------------- |
| **Backoffice** | <http://localhost>        | Main interface  |
| **Web**        | <http://localhost/web>    | Web application |
| **API**        | <http://localhost/api>    | Backend         |
| **Health**     | <http://localhost/health> | Service status  |

## 🛠️ Technologies Used

### Backend

- **Node.js** - Runtime
- **TypeScript** - Language
- **Express** - Web framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Redis** - Cache
- **Sentry** - Error monitoring
- **JWT** - Authentication
- **RBAC** - Role-based access control

### Frontend

- **Next.js** - React framework
- **TypeScript** - Language
- **Tailwind CSS** - CSS framework
- **React** - UI library

### DevOps

- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **Turborepo** - Monorepo management
- **GitHub Actions** - CI/CD
- **Vitest** - Testing

## 📦 Development Structure

### Shared Packages

- **`@nine-line/eslint`** - ESLint configurations
- **`@nine-line/tsconfig`** - TypeScript configurations
- **`@nine-line/ui`** - UI components
- **`@nine-line/config/nginx`** - Nginx configurations

### Standardization

- **ESLint**: Centralized configurations by project type
- **TypeScript**: Base configurations extended by project
- **UI**: Reusable components with Tailwind CSS
- **Nginx**: Centralized configuration for reverse proxy

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for complete automation:

### Pipeline Jobs

1. **Lint & Type Check** - Code and type verification
2. **API Tests & Build** - API tests and build
3. **Web App Tests & Build** - Frontend tests and build
4. **Backoffice Tests & Build** - Admin panel tests and build
5. **Docs Tests & Build** - Documentation tests and build
6. **UI Package Tests & Build** - UI package tests and build
7. **Docker Build Tests** - Docker image build tests
8. **Integration Tests** - Integration tests
9. **Security Scan** - Security verification
10. **Deploy Development** - Development deployment
11. **Deploy Production** - Production deployment

### Triggers

- **Push** to `main` and `develop`
- **Pull Request** to `main` and `develop`

## 📋 GitHub Templates

The project includes standardized templates for:

### Pull Requests

- Verification checklist
- Change description
- Tests performed
- Breaking changes

### Issues

- **Bug Report** - Bug reporting
- **Feature Request** - Feature requests
- **Documentation Request** - Documentation improvements

## 📝 Important Notes

### Centralized Configurations

- **ESLint**: Configurations in `packages/config/eslint/`
- **TypeScript**: Configurations in `packages/config/tsconfig/`
- **Nginx**: Configurations in `packages/config/nginx/`
- **UI**: Components in `packages/ui/`

### Environment Variables

- **API**: `apps/api/.env` (required)
- **Backoffice**: `apps/backoffice/.env` (required)
- **Web**: Defined in `docker-compose.yml` (automatic)

### Development

1. **Local**: Use `npm run dev` for local development
2. **Docker**: Use `npm run dev:docker` for containerized environment
3. **Nginx**: Reverse proxy for application routing

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**: Check if other services are running
2. **Dependencies**: Run `npm install` in root
3. **Docker**: Use `docker-compose down` and `docker-compose up --build`
4. **Nginx**: Check logs with `docker-compose logs nginx`
5. **Environment files**: Web app doesn't need .env file (uses docker-compose variables)
6. **RBAC**: Run `npm run setup` in `apps/api` folder to configure roles

### Logs

```bash
# View all service logs
docker-compose logs

# View specific logs
docker-compose logs api
docker-compose logs backoffice
docker-compose logs web
docker-compose logs nginx
```

## 📊 Project Status

### ✅ Implemented Features

- [x] **Clean Architecture** - Modular and scalable structure
- [x] **Domain Driven Design** - Domain-oriented design
- [x] **RBAC System** - Role-based access control
- [x] **Redis Caching** - Cache with intelligent invalidation
- [x] **Sentry Integration** - Error monitoring
- [x] **Swagger Documentation** - Automatic API documentation
- [x] **GitHub Actions** - Complete CI/CD pipeline
- [x] **Docker Setup** - Complete containerization
- [x] **TypeScript** - Static typing
- [x] **ESLint & Prettier** - Code standardization
- [x] **Vitest** - Unit and integration tests
- [x] **Prisma** - ORM with migrations
- [x] **JWT Authentication** - Secure authentication
- [x] **Health Checks** - Health monitoring
- [x] **Structured Logging** - Structured logs with Pino
- [x] **Graceful Shutdown** - Graceful shutdown
- [x] **Rate Limiting** - Spam protection
- [x] **CORS Configuration** - CORS configuration
- [x] **Helmet Security** - Security headers
- [x] **Compression** - Response compression
- [x] **GitHub Templates** - Standardized templates

### 🚧 In Development

- [ ] **E2E Tests** - End-to-end tests
- [ ] **Performance Monitoring** - Performance monitoring
- [ ] **Analytics** - Usage analytics
- [ ] **Mobile App** - Mobile application
- [ ] **Real-time Features** - Real-time features
