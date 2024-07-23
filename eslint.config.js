// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      ecmaVersion: 2023, // Usando a versão mais recente compatível com Node.js 20
      sourceType: "module", // Assume que você está usando módulos ES
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // Regras de estilo e melhores práticas
      "semi": ["error", "always"], // Requer ponto e vírgula no final de cada declaração
      "quotes": ["error", "double"], // Requer o uso de aspas duplas
      "no-var": "error", // Proíbe o uso de var
      // Outras regras que você desejar
    },
  },
];
