import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
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
        '**/presentation/docs/**',
      ],
    },
  },

  optimizeDeps: {
    include: ['@/test/factories/make-user'],
  },
  define: {
    'process.env.NODE_ENV': '"test"',
  },
});
