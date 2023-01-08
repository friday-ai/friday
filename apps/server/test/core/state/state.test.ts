import { assert, expect } from 'chai';
import State from '../../../src/core/state/state';
import { AvailableState, StateOwner, SystemVariablesNames, VariableOwner } from '../../../src/config/constants';
import { DatabaseValidationError, NotFoundError } from '../../../src/utils/decorators/error';

let state: State;

describe('State.set', () => {
  before(async () => {
    state = global.FRIDAY.state;
  });

  it('should create a state', async () => {
    const createdState = await state.set({
      id: '9a05e6c3-e36a-4779-bc66-6f7d015920c7',
      owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
    });

    expect(createdState).to.have.property('id');
    expect(createdState).to.have.property('owner');
    expect(createdState).to.have.property('ownerType');
    expect(createdState).to.have.property('value');
  });

  it('should not create a state with a empty owner id', async () => {
    const promise = state.set({
      id: '43b55c29-70d9-4213-9cce-a5f3c74ff38c',
      owner: '',
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
    });
    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a state with a wrong owner id', async () => {
    const promise = state.set({
      id: '9a05e6c3-e36a-4779-bc66-6f7d015920c7',
      owner: '246291a1-9f31-4201-8996-0a938c54a8bf',
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});

describe('State.getByOwner', () => {
  before(async () => {
    state = global.FRIDAY.state;
  });

  it('should return a state of one owner', async () => {
    const stateReturned = await state.getByOwner('c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a');

    expect(stateReturned).to.have.property('id');
    expect(stateReturned).to.have.property('owner');
    expect(stateReturned).to.have.property('ownerType');
    expect(stateReturned).to.have.property('value');
  });

  it('should not found state', async () => {
    const promise = state.getByOwner('639cf491-7ff5-4e76-853d-806c81e53f8d');
    await assert.isRejected(promise, NotFoundError);
  });
});

describe('State.purge', () => {
  before(async () => {
    state = global.FRIDAY.state;
  });

  it('should purge all states', async () => {
    await global.FRIDAY.variable.create({
      key: SystemVariablesNames.HISTORY_STATE_IN_DAYS,
      value: '30',
      owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      ownerType: VariableOwner.SATELLITE,
    });

    const promise = state.purge();
    await assert.isFulfilled(promise);
  });
});
