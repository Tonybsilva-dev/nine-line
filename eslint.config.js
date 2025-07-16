import config from "@nine-line/eslint/flat/base";

export default [
  {
    // Ignora arquivos de configuração legacy, build, cache, etc
    ignores: [
      "packages/config/eslint/legacy/*",
      "node_modules/",
      ".turbo/",
      ".next/",
      "dist/",
      "build/",
      "*.config.js",
      "*.config.mjs",
      "*.config.cjs",
      ".env*",
      "coverage/",
    ],
  },
  // ...restante da configuração
  ...config,
];
