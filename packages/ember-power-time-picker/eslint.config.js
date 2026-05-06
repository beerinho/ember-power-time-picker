'use strict';

const { defineConfig, globalIgnores } = require('eslint/config');
const babelParser = require('@babel/eslint-parser');
const ember = require('eslint-plugin-ember');
const emberParser = require('ember-eslint-parser');
const _import = require('eslint-plugin-import');
const { fixupPluginRules } = require('@eslint/compat');
const globals = require('globals');
const n = require('eslint-plugin-n');
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  ...compat.extends('plugin:ember/recommended-gjs'),

  {
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        babelOptions: {
          root: __dirname,
        },
      },

      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      ember,
      import: fixupPluginRules(_import),
    },

    extends: compat.extends('plugin:prettier/recommended'),

    rules: {},
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
    },
  },

  {
    files: [
      './.eslintrc.cjs',
      './.prettierrc.cjs',
      './.template-lintrc.cjs',
      './addon-main.cjs',
    ],

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

    plugins: { n },

    extends: compat.extends('plugin:n/recommended'),
  },

  globalIgnores(['blueprints/*/files/', 'dist/', 'declarations/', 'coverage/']),
]);
