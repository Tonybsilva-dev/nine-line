export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      "nine-line/eslint/base",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
    ],
    plugins: ["react", "react-hooks", "jsx-a11y"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
