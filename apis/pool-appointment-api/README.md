[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="#">
    <img src="./assets/pool-appointment-icon.png" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">Pool Appointment</h3>

  <p align="center">
    Appointment Manager System.
    <br />ı
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/Tonybsilva-dev/pool-appointment-api/issues">Report Bug / Request Feature</a>
    ·
    <a href="https://stats.uptimerobot.com/No5gmhZgx7">Status Application</a>
  </p>
</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** (for Redis)
- **PostgreSQL** (for database)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/Tonybsilva-dev/pool-appointment-api.git
   cd pool-appointment-api
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

## 🚀 Setup com Docker Compose (Monorepo)

Agora o setup de todos os serviços (API, banco de dados, Redis) é feito a partir da raiz do monorepo:

```sh
# Na raiz do projeto
cp env.example .env # Ajuste as variáveis conforme necessário
cp apis/pool-appointment-api/.env.example apis/pool-appointment-api/.env # Ajuste as variáveis da API

docker-compose up --build
```

- O banco de dados e o Redis já estarão disponíveis para a API via os hosts `db` e `redis`.
- Não é mais necessário rodar docker-compose localmente dentro de apis/pool-appointment-api.
- O arquivo `docker-compose.redis.yml` foi removido pois está obsoleto.

4. Install optional development dependencies

   ```sh
   # For colored logs and better development experience
   ./scripts/install-dev-deps.sh
   ```

5. Configure environment variables

   ```sh
   # Copy the example file
   cp env.example .env

   # Edit the file with your database configuration
   nano .env
   ```

6. Run database migrations

   ```sh
   npm run db:migrate
   ```

   <!-- USAGE EXAMPLES -->

## Usage

### Development

```sh
# Start development server
npm run dev

# Run tests
npm run test

# Check types
npm run check-types

# Run linting
npm run lint
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
curl http://localhost:3000/api/health
```

### API Documentation

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

_For more examples, please refer to the [Documentation](docs/)_

## Download API

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Pool%20Appointment%20Api&uri=https%3A%2F%2Fgithub.com%2FTonybsilva-dev%2Fpool-appointment-api%2Fblob%2Fdevelop%2Fsrc%2Fcore%2Fdocs%2Finsomnia.json)

## Roadmap

See the [open issues](https://github.com/Tonybsilva-dev/pool-appointment-api/issues) for a list of proposed features (and known issues).

## Features

```bash
📝 Notes.

- [x] Domain Driven Design
- [x] Automated Tests
- [x] Clean Architecture
- [x] Functional Error Handling
- [x] Factory and Repository Pattern
- [x] Swagger Documentation
- [x] Redis Caching
- [x] Structured Logging
- [x] Health Checks
- [x] Graceful Shutdown
- [x] Request/Response Logging
- [x] Performance Monitoring
- [ ] Docker
- [ ] CI/CD
```

## Architecture

The API follows Clean Architecture principles with:

- **Domain Layer**: Business logic and entities
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: External services (database, Redis, etc.)
- **Presentation Layer**: Controllers and routes

### Logging & Monitoring

The API includes comprehensive logging and monitoring:

- **Request Logging**: All HTTP requests are logged with performance metrics
- **Error Logging**: Structured error logging with stack traces
- **Performance Monitoring**: Automatic detection of slow requests and queries
- **Health Checks**: Database and Redis connectivity monitoring
- **Graceful Shutdown**: Proper cleanup of connections and resources

<!-- CONTACT -->

### Author

---

 <table>
  <tr>
    <td align="center"><a href="https://github.com/Tonybsilva-dev"><img src="https://avatars.githubusercontent.com/u/54373473?v=4" width="100px;" alt=""/><br /><sub><b>Antonio Silva</b></sub></a><br /><a href="https://github.com/Tonybsilva-dev/pool-appointment-api/commits?author=Tonybsilva-dev" title="Documentation">📖</a> <a href="https://github.com/Tonybsilva-dev/pool-appointment-api/pulls?q=is%3Apr+reviewed-by%3ATonybsilva-dev" title="Reviewed Pull Requests">👀</a></td>
 </tr>
</table>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Tonybsilva-dev/pool-appointment-api.svg?style=for-the-badge
[contributors-url]: https://github.com/Tonybsilva-dev/pool-appointment-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Tonybsilva-dev/pool-appointment-api.svg?style=for-the-badge
[forks-url]: https://github.com/Tonybsilva-dev/pool-appointment-api/network/members
[stars-shield]: https://img.shields.io/github/stars/Tonybsilva-dev/pool-appointment-api.svg?style=for-the-badge
[stars-url]: https://github.com/Tonybsilva-dev/pool-appointment-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/Tonybsilva-dev/pool-appointment-api.svg?style=for-the-badge
[issues-url]: https://github.com/Tonybsilva-dev/pool-appointment-api/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/tony-silva/
