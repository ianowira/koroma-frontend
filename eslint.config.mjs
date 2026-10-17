import next from "eslint-config-next";
import importX from "eslint-plugin-import-x";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = [
  // Native Next.js flat config (eslint-config-next 16.x provides flat config by default)
  ...next,

  // Custom rules with native ES module plugins
  {
    plugins: {
      "unused-imports": unusedImports,
      "import-x": {
        rules: importX.rules,
      },
    },
    rules: {
      // 1. Prevent raw console.log (allow warn, error, info)
      "no-console": ["error", { allow: ["warn", "error", "info"] }],

      // 2. Remove unused imports
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // 3. Enforce strict import ordering
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
