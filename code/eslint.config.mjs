import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "camelcase": "error",
      "indent": ["error", 2],
      "no-duplicate-imports": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "react/jsx-no-target-blank": "error"
    }
  },
]);

export default eslintConfig;