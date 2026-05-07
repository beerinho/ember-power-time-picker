import { defineConfig, globalIgnores } from "eslint/config";

import n from "eslint-plugin-n";

import { browserConfig, nodeConfig, compat } from "../../eslint.config.mjs";

export default defineConfig([
  {
    ...browserConfig,
    languageOptions: {
      ...browserConfig.languageOptions,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: [
            [
              "@babel/plugin-proposal-decorators",
              { decoratorsBeforeExport: true },
            ],
          ],
        },
      },
    },
  },

  {
    files: [
      "./.prettierrc.js",
      "./.stylelintrc.js",
      "./.template-lintrc.js",
      "./ember-cli-build.js",
      "./testem.js",
      "./config/**/*.js",
    ],
    ...nodeConfig,
    plugins: { n },
    extends: compat.extends("plugin:n/recommended"),
  },

  {
    files: ["tests/**/*-test.{js,ts}"],
    extends: compat.extends("plugin:qunit/recommended"),
  },

  globalIgnores([
    "blueprints/*/files/",
    "declarations/",
    "dist/",
    "coverage/",
    "!**/.*",
    "**/.*/",
    ".node_modules.ember-try/",
  ]),
]);
