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

describe('System.saveVersion', () => {
  const userClass = new User();
  const variableClass = new Variable();
  const roomClass = new Room();
  const satelliteClass = new Satellite();
  const houseClass = new House();
  const event = new Event();
  const scheduler = new Scheduler(event, jobs);
  const system = new System(variableClass, houseClass, roomClass, satelliteClass, userClass, scheduler, database);

  before(async function before() {
    this.timeout(8000);
    await system.init();
  });

  it('should save friday version', async () => {
    await system.saveVersion('52.20.45');
    const version = await system.getVersion();
    expect(version[1]).to.equal('52.20.45');
  });
});
