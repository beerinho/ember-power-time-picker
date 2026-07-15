'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-power-time-picker'],
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  // staticEmberSource is required for @embroider/core's backward-compatible tests
  // bundle to resolve ember-source's ember-testing module; it also becomes the
  // (non-optional) default in the next Embroider major.
  return maybeEmbroider(app, {
    staticEmberSource: true,
  });
};
