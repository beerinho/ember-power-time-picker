import { fileURLToPath } from 'url';
import path from 'path';

import babelParser from '@babel/eslint-parser';
import ember from 'eslint-plugin-ember';
import globals from 'globals';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export const browserConfig = {
  languageOptions: {
    parser: babelParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
    },
  },
  plugins: { ember },
  extends: compat.extends(
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ),
  rules: {},
};

export const nodeConfig = {
  languageOptions: {
    sourceType: 'script',
    parserOptions: {},
    globals: {
      ...Object.fromEntries(
        Object.entries(globals.browser).map(([key]) => [key, 'off']),
      ),
      ...globals.node,
    },
  },
};

export { compat };