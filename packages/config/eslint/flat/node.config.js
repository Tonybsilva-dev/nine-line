import base from "./base.config.js";

export default [
  ...base,
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      sourceType: "script",
    },
    rules: {
      // Regras específicas para Node.js
    },
  },
];
