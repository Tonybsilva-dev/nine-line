import base from "./base.config.js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  ...base,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
  // Adicione regras específicas de React aqui se desejar
];
