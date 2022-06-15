/* eslint-disable func-names */
import sinon, { assert } from 'sinon';
import User from '../../../src/core/user';
import Variable from '../../../src/core/variable';
import Room from '../../../src/core/room';
import Satellite from '../../../src/core/satellite';
import House from '../../../src/core/house';
import Event from '../../../src/utils/event';
import State from '../../../src/core/state';
import Scheduler from '../../../src/utils/scheduler';
import jobs from '../../../src/config/jobs';
import System from '../../../src/core/system';

describe('System.shutdown', () => {
  const databaseStub = {
    closeConnection: sinon.stub(),
  };

  const user = new User();
  const variable = new Variable();
  const room = new Room();
  const satellite = new Satellite();
  const house = new House();
  const event = Event;
  const state = new State(event, variable);
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