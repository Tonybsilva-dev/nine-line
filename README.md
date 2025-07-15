# Nine Line Monorepo

This repository uses Turborepo to organize multiple applications and shared packages in a single monorepo, making development, standardization, and scalability easier.

## Project Structure

```
nine-line/
├── apps/
│   ├── docs/   # Next.js app for documentation
│   └── web/    # Main Next.js application
├── packages/
│   ├── config/
│   │   ├── eslint/    # Centralized ESLint configurations
│   │   └── tsconfig/  # Centralized TypeScript configurations
│   └── ui/            # Shared React components
├── package.json       # Workspaces configuration
└── turbo.json         # Turborepo configuration
```

### Apps
- **web**: Main Next.js application.
- **docs**: Next.js application for documentation.

### Shared Packages
- **@nine-line/ui**: Reusable React component library.
- **@nine-line/eslint**: Centralized ESLint configurations for the entire monorepo.
- **@nine-line/tsconfig**: Centralized TypeScript configurations for the entire monorepo.

## Centralized Configurations

ESLint and TypeScript configurations are located in `packages/config` and are used by all apps and packages. This ensures standardization and makes maintenance easier.

- To use the centralized ESLint config, each app has a `.eslintrc.js` like:
  ```js
  module.exports = {
    extends: ["@nine-line/eslint/react"]
  };
  ```
- To use the centralized TypeScript config, each app has a `tsconfig.json` like:
  ```json
  {
    "extends": "@nine-line/tsconfig/react"
  }
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
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Development**
   To run all applications in development mode:
   ```sh
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```
   To run a specific application:
   ```sh
   npm run dev --filter=web
   npm run dev --filter=docs
   ```

4. **Build**
   To build all applications and packages:
   ```sh
   npm run build
   ```

## Notes
- Always install dependencies from the root of the monorepo to ensure workspaces function correctly.
- Centralized configurations make code maintenance and standardization easier.

---

Feel free to contribute or suggest improvements!
