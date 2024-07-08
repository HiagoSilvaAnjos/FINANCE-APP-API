import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.node, jest
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // Adicione suas regras aqui
      "semi": ["error", "always"], // Exemplo: Requer ponto e vírgula no final de cada declaração
      "quotes": ["error", "double"], // Exemplo: Requer o uso de aspas duplas,
      "no-var": "error" // Proíbe o uso de var
    }
  }
];