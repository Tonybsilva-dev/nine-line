import config from "@nine-line/eslint/flat/react";

export default [
  {
    ignores: [
      "*.config.js",
      "*.config.ts",
      "*.config.mjs",
      "next.config.js",
      "next.config.ts",
      "postcss.config.js",
      "postcss.config.ts",
      "tailwind.config.js",
      "tailwind.config.ts",
    ],
  },
  ...config,
];
