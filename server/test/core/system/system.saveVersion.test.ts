import { expect } from 'chai';
import System from '../../../src/core/system';
import Variable from '../../../src/core/variable';
import House from '../../../src/core/house';
import Room from '../../../src/core/room';
import Satellite from '../../../src/core/satellite';
import User from '../../../src/core/user';
import State from '../../../src/core/state';
import Scheduler from '../../../src/utils/scheduler';
import Event from '../../../src/utils/event';
import * as database from '../../../src/config/database';
import jobs from '../../../src/config/jobs';

describe('System.saveVersion', () => {
  const user = new User();
  const variable = new Variable();
  const room = new Room();
  const satellite = new Satellite();
  const house = new House();
  const event = new Event();
  const state = new State(event, variable);
  const scheduler = new Scheduler(event, jobs);
  const system = new System(variable, house, room, satellite, user, state, scheduler, database);

  it('should save friday version', async () => {
    await system.saveVersion('52.20.45');
    const version = await system.getVersion();
    expect(version[1]).to.equal('52.20.45');
  });
});
