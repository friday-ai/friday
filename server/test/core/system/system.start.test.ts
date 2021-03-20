/* eslint-disable func-names */
import { assert, expect } from 'chai';
import sinon from 'sinon';
import System from '../../../src/core/system';
import Variable from '../../../src/core/variable';
import House from '../../../src/core/house';
import Room from '../../../src/core/room';
import Satellite from '../../../src/core/satellite';
import User from '../../../src/core/user';
import Scheduler from '../../../src/utils/scheduler';
import Event from '../../../src/utils/event';
import * as database from '../../../src/config/database';
import jobs from '../../../src/config/jobs';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('System.start', () => {
  const user = new User();
  const variable = new Variable();
  const room = new Room();
  const satellite = new Satellite();
  const house = new House();
  const event = new Event();
  const scheduler = new Scheduler(event, jobs);
  const system = new System(variable, house, room, satellite, user, scheduler, database);

  beforeEach(async function before() {
    this.timeout(8000);
    // Delete all items for tests
    await database.database.getQueryInterface().bulkDelete('user', {}, {});
    await database.database.getQueryInterface().bulkDelete('variable', {}, {});
  });

  it('should start friday system', async function () {
    this.timeout(8000);
    // Override objects for tests
    system.env = 'production';

    const version = await system.start();
    expect(version).to.be.an('string');
  });

  it('should not start friday system', async () => {
    const spy = sinon.spy();
    // Override objects for tests
    system.env = 'production';
    system.init = spy;

    const promise = system.start();
    await assert.isRejected(promise, NotFoundError);
    expect(spy.called).equal(true);
  });
});
