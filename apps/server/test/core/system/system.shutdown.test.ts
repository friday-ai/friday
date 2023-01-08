/* eslint-disable func-names */
import sinon, { assert } from 'sinon';
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

describe('System.shutdown', () => {
  const databaseStub = {
    closeConnection: sinon.stub(),
  };

  const event = Event;
  const variable = new Variable();
  const state = new State(event, variable);
  const user = new User(state);
  const room = new Room(state);
  const satellite = new Satellite(state);
  const house = new House(state);
  const scheduler = new Scheduler(event, jobs);
  const system = new System(variable, house, room, satellite, user, state, scheduler, databaseStub);

  let sandbox: sinon.SinonSandbox, exitStub: sinon.SinonSpy<any, any>;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    exitStub = sandbox.stub(process, 'exit');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should stop friday system', async function () {
    this.timeout(8000);

    await system.shutdown();

    assert.calledOnce(exitStub);
  });
});
