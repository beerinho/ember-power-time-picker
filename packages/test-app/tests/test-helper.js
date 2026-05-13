import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import registerWaiter from 'ember-raf-scheduler/test-support/register-waiter';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import Application from 'test-app/app';
import config from 'test-app/config/environment';

setApplication(Application.create(config.APP));

registerWaiter();
setup(QUnit.assert);

start();
