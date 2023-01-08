/* eslint-disable func-names */
import { expect } from 'chai';
import * as database from '../../../src/config/database';
import { SystemVariablesNames, VariableOwner } from '../../../src/config/constants';
import User from '../../../src/core/user/user';
import Variable from '../../../src/core/variable/variable';
import Room from '../../../src/core/room/room';
import Satellite from '../../../src/core/satellite/satellite';
import House from '../../../src/core/house/house';
import Event from '../../../src/utils/event';
import State from '../../../src/core/state/state';
import Scheduler from '../../../src/utils/scheduler';
import jobs from '../../../src/config/jobs';
import System from '../../../src/core/system/system';

describe('System.init', () => {
  const event = Event;
  const variable = new Variable();
  const state = new State(event, variable);
  const user = new User(state);
  const room = new Room(state);
  const satellite = new Satellite(state);
  const house = new House(state);
  const scheduler = new Scheduler(event, jobs);
  const system = new System(variable, house, room, satellite, user, state, scheduler, database);

  it('should init friday system and go to nominal mode', async function () {
    this.timeout(8000);

    await database.database.getQueryInterface().bulkDelete('satellite', {});
    await database.database.getQueryInterface().bulkDelete('variable', {});

    await database.database.getQueryInterface().bulkInsert('variable',
      [{
        id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f33',
        key: SystemVariablesNames.HISTORY_STATE_IN_DAYS,
        value: '6 months',
        owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        ownerType: VariableOwner.SATELLITE,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

    const result = await system.init();

    expect(result).to.be.an('string');
    expect(result).to.be.not.equal(null);
  });

  it('should not init friday system twice', async function () {
    // @ts-ignore
    const friday = global.FRIDAY;
    const result = await friday.init();
    expect(result).to.be.equal(false);
  });
});
