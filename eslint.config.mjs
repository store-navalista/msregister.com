import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ...pluginReactConfig,
    rules: {
      ...pluginReactConfig.rules,
      'react/prop-types': 'off',
      // "no-unused-vars": ["error", {
      //   "vars": "all",
      //   "args": "after-used",
      //   "caughtErrors": "all",
      //   "ignoreRestSiblings": false,
      //   "reportUsedIgnorePattern": false
      // }]
      'react/react-in-jsx-scope': 'off'
    },
  },
];