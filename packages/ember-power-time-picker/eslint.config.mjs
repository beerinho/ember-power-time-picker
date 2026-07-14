// The shared v2-addon preset parses `**/*.js` with the synchronous
// `@babel/eslint-parser`, which cannot run this project's async Babel config
// (`babel-plugin-ember-template-compilation` v4 is async). Override the parser
// with the async worker variant — the same one the config's v2-app preset uses.
import babelEslintParser from '@babel/eslint-parser/experimental-worker';
import config from '@ijlee2-frontend-configs/eslint-config-ember/v2-addon';

export default [
  ...config,
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelEslintParser,
    },
  },
];
