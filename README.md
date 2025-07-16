# Nine Line Monorepo

This repository uses Turborepo to organize multiple applications, APIs, and shared packages in a single monorepo, making development, standardization, and scalability easier.

## Project Structure

```
nine-line/
├── apps/
│   ├── docs/   # Next.js application for documentation
│   └── web/    # Main Next.js application
├── apis/
│   └── pool-appointment-api/  # REST API with Node.js/Express
├── mobile/     # Future mobile applications
├── packages/
│   ├── config/
│   │   ├── eslint/    # Centralized ESLint configurations
│   │   └── tsconfig/  # Centralized TypeScript configurations
│   └── ui/            # Shared React components
├── package.json       # Workspaces configuration
└── turbo.json         # Turborepo configuration
```

## Projects

### 🌐 Web Applications

| Project  | Description      | Technology            | Port | Tests |
| -------- | ---------------- | --------------------- | ---- | ----- |
| **web**  | Main application | Next.js 15 + React 19 | 3000 | ❌    |
| **docs** | Documentation    | Next.js 15 + React 19 | 3001 | ❌    |

### 📱 Mobile Applications

| Project       | Description         | Technology   | Status | Tests |
| ------------- | ------------------- | ------------ | ------ | ----- |
| _Coming soon_ | Mobile applications | React Native | 🚧     | ❌    |

### 🔌 APIs

| Project                  | Description                 | Technology                 | Port | Tests |
| ------------------------ | --------------------------- | -------------------------- | ---- | ----- |
| **pool-appointment-api** | Appointments and spaces API | Node.js + Express + Prisma | 3333 | ✅    |

### 📦 Shared Packages

| Package                 | Description                           | Type          | Tests |
| ----------------------- | ------------------------------------- | ------------- | ----- |
| **@nine-line/ui**       | React component library               | UI Components | ❌    |
| **@nine-line/eslint**   | Centralized ESLint configurations     | Config        | ❌    |
| **@nine-line/tsconfig** | Centralized TypeScript configurations | Config        | ❌    |

## Centralized Configurations

ESLint and TypeScript configurations are located in `packages/config` and are used by all apps and packages. This ensures standardization and makes maintenance easier.

### ESLint (Flat Config - ESLint 9+)

```js
// eslint.config.js
import config from "@nine-line/eslint/flat/react";
export default config;
```

### TypeScript

```json
// tsconfig.json
{
  "extends": "@nine-line/tsconfig/react"
}
```

## Available Scripts

### Development

```bash
# Run all applications in development mode
npm run dev

# Run specific application
npm run dev --filter=web
npm run dev --filter=docs
npm run dev --filter=pool-appointment-api
```

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality

```bash
# Lint entire monorepo
npm run lint

# Check TypeScript types
npm run check-types

# Format code
npm run format
```

### Build

```bash
# Build all projects
npm run build
```

## How to Start the Project

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd nine-line
   ```

2. **Install dependencies at the root of the monorepo:**

   ```sh
   npm install
   ```

3. **Development:**

   ```sh
   # Run all applications
   npm run dev

   # Run specific application
   npm run dev --filter=web
   npm run dev --filter=docs
   npm run dev --filter=pool-appointment-api
   ```

4. **Testing:**

   ```sh
   # Run all tests
   npm run test

   # Run tests for a specific API
   cd apis/pool-appointment-api
   npm run test
   ```

## Technologies Used

### Frontend

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Static typing
- **Tailwind CSS** - CSS framework

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Redis** - Cache and sessions
- **JWT** - Authentication

### Tools

- **Turborepo** - Build system for monorepos
- **ESLint** - Code linter
- **Prettier** - Code formatter
- **Vitest** - Testing framework
- **Husky** - Git hooks

## Development Structure

| Directory       | Purpose               | Description                     |
| --------------- | --------------------- | ------------------------------- |
| **`apps/`**     | Frontend applications | Next.js web applications        |
| **`apis/`**     | Backend services      | REST APIs and microservices     |
| **`mobile/`**   | Mobile applications   | Future React Native apps        |
| **`packages/`** | Shared packages       | Reusable components and configs |

## Important Notes

- Always install dependencies at the root of the monorepo to ensure workspaces function correctly.
- Centralized configurations make code maintenance and standardization easier.
- Use Turbo filters to run commands in specific workspaces.
- Turborepo caches builds and tests for better performance.

---

Feel free to contribute or suggest improvements!
