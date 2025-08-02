import config from "@nine-line/eslint/flat/lib";

export default [
  {
    ignores: [
      "dist/**",
      "*.config.js",
      "*.config.ts",
      "*.config.mjs",
      "postcss.config.mjs",
      "tailwind.config.ts",
      "src/scripts/**",
    ],
  },
  ...config,
];
