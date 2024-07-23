// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "semi": ["error", "always"], // Requer ponto e vírgula no final de cada declaração
      "quotes": ["error", "double"], // Requer o uso de aspas duplas
      "no-var": "error", // Proíbe o uso de var
    },
  },
];
