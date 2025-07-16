import config from '@nine-line/eslint/flat/node';

export default [
  {
    ignores: [
      '.env*',
      '.github/',
      'build/',
      'coverage/',
      'dist/',
      'node_modules/',
      'prisma/',
      'test/',
      '*.config.cjs',
      '*.config.js',
      '*.config.mjs',
    ],
  },
  ...config,
];
