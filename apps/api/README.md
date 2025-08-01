[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="#">
    <img src="./assets/nine-line-spaces.png" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">9line Spaces API</h3>

  <p align="center">
    Space Management and Appointment Booking System with Clean Architecture.
    <br />
    <a href="#"><strong>Explore the documentation »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/Tonybsilva-dev/nine-line/issues">Report Bug / Request Feature</a>
    ·
    <a href="https://stats.uptimerobot.com/No5gmhZgx7">Application Status</a>
  </p>
</p>

<!-- GETTING STARTED -->

## 🚀 Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** (for Redis and PostgreSQL)
- **PostgreSQL** (for database)

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/Tonybsilva-dev/nine-line.git
   cd nine-line
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Configure environment variables

   ```sh
   # Copy the example file
   cp apps/api/.env.example apps/api/.env

   # Edit the file with your configurations
   nano apps/api/.env
   ```

4. Setup the project (migrations, seeders, RBAC)

   ```sh
   cd apps/api
   npm run setup
   ```

## 🐳 Setup with Docker Compose (Monorepo)

Now the setup of all services (API, database, Redis) is done from the monorepo root:

```sh
# In the project root
cp apps/api/.env.example apps/api/.env # Adjust variables as needed

# Start all services
npm run dev:docker

# Or in background
npm run dev:docker:detached
```

- The database and Redis will already be available to the API via the hosts `db` and `redis`.
- It's no longer necessary to run docker-compose locally within apps/api.

## 📖 Usage

### Development

```sh
# Start development server
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Check types
npm run check-types

# Run linting
npm run lint

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
```

### Production

```sh
# Build the application
npm run build

# Start production server
npm start
```

### Health Check

The API provides a health check endpoint:

```sh
curl http://localhost:3333/health
```

### API Documentation

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3333/api-docs
```

## 🏗️ Architecture

The API follows Clean Architecture principles with:

- **Domain Layer**: Business logic and entities
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: External services (database, Redis, etc.)
- **Presentation Layer**: Controllers and routes

### Application Modules

- **Auth**: Authentication and authorization with JWT
- **Users**: User management
- **Appointments**: Appointments and bookings
- **Spaces**: Space management
- **Notifications**: Notification system
- **Ratings**: Rating system
- **RBAC**: Role-based access control

### Logging & Monitoring

The API includes comprehensive logging and monitoring:

- **Request Logging**: All HTTP requests are logged with performance metrics
- **Error Logging**: Structured error logging with stack traces
- **Performance Monitoring**: Automatic detection of slow requests and queries
- **Health Checks**: Database and Redis connectivity monitoring
- **Graceful Shutdown**: Proper cleanup of connections and resources
- **Sentry Integration**: Error monitoring in production

## 🔐 Authentication and Authorization

### JWT Authentication

- Access and refresh tokens
- Token validation with Redis cache
- Automatic cache invalidation

### RBAC (Role-Based Access Control)

- **System Roles**: ADMIN, MANAGER, USER
- **Permissions**: Granular permission control
- **Role Assignment**: Automatic role assignment to users

### Security Middleware

- Rate limiting
- CORS configuration
- Helmet security headers
- Request validation

## 💾 Cache and Performance

### Redis Cache

- Authenticated user cache
- Configurable TTL (5 minutes)
- Automatic invalidation
- Database fallback

### Optimizations

- Response compression
- Lazy loading of dependencies
- Connection pooling
- Query optimization

## 📊 Features

```bash
📝 Implemented Features.

- [x] Domain Driven Design
- [x] Clean Architecture
- [x] RBAC System (Role-Based Access Control)
- [x] JWT Authentication
- [x] Redis Caching
- [x] Sentry Error Monitoring
- [x] Automated Tests (Vitest)
- [x] Swagger Documentation
- [x] Structured Logging (Pino)
- [x] Health Checks
- [x] Graceful Shutdown
- [x] Request/Response Logging
- [x] Performance Monitoring
- [x] Rate Limiting
- [x] CORS Configuration
- [x] Helmet Security
- [x] Compression
- [x] Docker Support
- [x] CI/CD Pipeline
- [x] GitHub Templates
- [x] Prisma ORM
- [x] PostgreSQL Database
- [x] TypeScript
- [x] ESLint & Prettier
```

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pool_appointments"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="1d"
JWT_REFRESH_EXPIRES_IN="7d"

# Sentry
SENTRY_DSN="your-sentry-dsn"

# Server
PORT=3333
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Available Scripts

```bash
# Development
npm run dev              # Development server
npm run test             # Run tests
npm run test:watch       # Tests in watch mode
npm run test:coverage    # Tests with coverage

# Build
npm run build            # Build application
npm run start            # Start production

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio

# Setup
npm run setup            # Setup project (migrations, seeders, RBAC)

# Code Quality
npm run lint             # Run ESLint
npm run check-types      # Check TypeScript types
```

## 📚 Documentation

### Main Endpoints

- `POST /auth/login` - Authentication
- `POST /auth/logout` - Logout
- `GET /health` - Health check
- `GET /api-docs` - Swagger documentation

### Modules

- **Auth**: `/auth/*` - Authentication and authorization
- **Users**: `/users/*` - User management
- **Appointments**: `/appointments/*` - Appointments
- **Spaces**: `/spaces/*` - Spaces
- **Notifications**: `/notifications/*` - Notifications
- **Ratings**: `/ratings/*` - Ratings
- **RBAC**: `/rbac/*` - Access control

## 🧪 Testing

### Test Types

- **Unit Tests**: Unit tests with Vitest
- **Integration Tests**: Integration tests
- **API Tests**: Endpoint tests
- **Database Tests**: Database tests

### Run Tests

```bash
# All tests
npm run test

# Tests in watch mode
npm run test:watch

# Tests with coverage
npm run test:coverage

# Specific tests
npm run test -- --grep "auth"
```

## 🚀 Deploy

### Docker

```bash
# Build image
docker build -f Dockerfile -t nine-line-api .

# Run container
docker run -p 3333:3333 nine-line-api
```

### Docker Compose

```bash
# Start all services
docker-compose up --build

# API only
docker-compose up api
```

## 📈 Monitoring

### Health Check

```bash
curl http://localhost:3333/health
```

Response:

```json
{
  "status": "OK",
  "timestamp": "2025-01-31T22:55:04.970Z",
  "uptime": 237.826921858,
  "environment": "development",
  "services": {
    "database": "OK",
    "redis": "OK"
  }
}
```

### Logs

The API uses Pino for structured logging:

```bash
# Development logs
npm run dev

# Production logs
npm start
```

## 🔍 Troubleshooting

### Common Issues

1. **Database connection error**: Check `DATABASE_URL`
2. **Redis connection error**: Check `REDIS_URL`
3. **JWT error**: Check `JWT_SECRET`
4. **Sentry error**: Check `SENTRY_DSN`

### Debug Logs

```bash
# Enable detailed logs
DEBUG=* npm run dev

# Specific logs
DEBUG=prisma:* npm run dev
DEBUG=redis:* npm run dev
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the `LICENSE` file for more details.

<!-- CONTACT -->

### Author

---

 <table>
  <tr>
    <td align="center"><a href="https://github.com/Tonybsilva-dev"><img src="https://avatars.githubusercontent.com/u/54373473?v=4" width="100px;" alt=""/><br /><sub><b>Antonio Silva</b></sub></a><br /><a href="https://github.com/Tonybsilva-dev/nine-line/commits?author=Tonybsilva-dev" title="Documentation">📖</a> <a href="https://github.com/Tonybsilva-dev/nine-line/pulls?q=is%3Apr+reviewed-by%3ATonybsilva-dev" title="Reviewed Pull Requests">👀</a></td>
 </tr>
</table>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Tonybsilva-dev/nine-line.svg?style=for-the-badge
[contributors-url]: https://github.com/Tonybsilva-dev/nine-line/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Tonybsilva-dev/nine-line.svg?style=for-the-badge
[forks-url]: https://github.com/Tonybsilva-dev/nine-line/network/members
[stars-shield]: https://img.shields.io/github/stars/Tonybsilva-dev/nine-line.svg?style=for-the-badge
[stars-url]: https://github.com/Tonybsilva-dev/nine-line/stargazers
[issues-shield]: https://img.shields.io/github/issues/Tonybsilva-dev/nine-line.svg?style=for-the-badge
[issues-url]: https://github.com/Tonybsilva-dev/nine-line/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/tony-silva/
