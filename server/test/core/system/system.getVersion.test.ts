import { expect } from 'chai';
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
import { version as packageVersion } from '../../../package.json';

describe('System.getVersion', () => {
  const user = new User();
  const variable = new Variable();
  const room = new Room();
  const satellite = new Satellite();
  const house = new House();
  const event = new Event();
  const scheduler = new Scheduler(event, jobs);
  const system = new System(variable, house, room, satellite, user, scheduler, database);

  before(async function before() {
    this.timeout(8000);
    await system.init();
  });

  it('should get friday version', async () => {
    const version = await system.getVersion();
    expect(version[1]).to.equal(packageVersion);
  });
});
