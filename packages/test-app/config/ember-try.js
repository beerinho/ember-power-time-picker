'use strict';

const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

// The embroider scenarios test the embroider build against a modern Ember.
// staticEmberSource (set in ember-cli-build.js) requires Ember to expose its
// glimmer/testing submodules as resolvable modules, which only works on newer
// Ember, so pin these scenarios rather than inheriting the app's dev version.
function withEmberSource(scenario, version) {
  scenario.npm.devDependencies = {
    ...scenario.npm.devDependencies,
    'ember-source': version,
  };
  return scenario;
}

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      // Supported floor: Ember 4.8. The addon's dependencies (@ember/test-helpers 5,
      // ember-power-select 7, ...) require Ember >= 4.8, so 3.28/4.4 are not supported.
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '~4.8.0',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
          },
        },
      },
      {
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
          },
        },
      },
      // Newest supported ceiling. Ember 7 is not yet supported: the addon's build
      // (babel-plugin-ember-template-compilation) cannot locate Ember 7's relocated
      // template compiler, so ember-release/beta/canary are omitted until it is ported.
      {
        name: 'ember-lts-6.12',
        npm: {
          devDependencies: {
            'ember-source': '~6.12.0',
          },
        },
      },
      withEmberSource(embroiderSafe(), '~6.12.0'),
      withEmberSource(embroiderOptimized(), '~6.12.0'),
    ],
  };
};
