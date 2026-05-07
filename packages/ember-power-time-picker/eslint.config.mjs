import { defineConfig, globalIgnores } from 'eslint/config';
import { fileURLToPath } from 'url';
import path from 'path';

import emberParser from 'ember-eslint-parser';
import _import from 'eslint-plugin-import';
import { fixupPluginRules } from '@eslint/compat';
import n from 'eslint-plugin-n';

import { browserConfig, nodeConfig, compat } from '../../eslint.config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...compat.extends('plugin:ember/recommended-gjs'),

  {
    ...browserConfig,
    languageOptions: {
      ...browserConfig.languageOptions,
      parserOptions: {
        babelOptions: {
          root: __dirname,
        },
      },
    },
    plugins: {
      ...browserConfig.plugins,
      import: fixupPluginRules(_import),
    },
  },

  {
    files: ['**/*.gjs'],
    languageOptions: {
      parser: emberParser,
    },
  },

  {
    files: ['src/**/*.{js,gjs}'],
    rules: {
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      'ember/no-at-ember-render-modifiers': 'off',
      'ember/no-runloop': 'off',
    },
  },

  {
    files: ['./.prettierrc.js', './.template-lintrc.js', './addon-main.js'],
    ...nodeConfig,
    plugins: { n },
    extends: compat.extends('plugin:n/recommended'),
  },

  globalIgnores(['blueprints/*/files/', 'dist/', 'declarations/', 'coverage/']),
]);
