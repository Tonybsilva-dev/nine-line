import * as path from 'node:path';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      provider: 'v8',
      exclude: [
        'test/setup.ts',
        '**/index.ts',
        '**/src/@types/**',
        '**/esbuild.config.js',
        '**/vitest.config.ts',
        '**/src/index.ts',
        '**/config/**',
        '**/core/routes/**',
        '**/core/types/**',
        '**/core/middlewares/error-handling.ts',
        '**/infra/repositories/prisma-user.repository.ts',
        '**/presentation/controllers/**',
        '**/presentation/routes/**',
        '**/presentation/validators/**',
        '**/presentation/doc/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/test': path.resolve(__dirname, 'test'),
    },
  },
});
