import { expect, assert } from 'chai';
import State from '../../../src/core/state';
import Variable from '../../../src/core/variable';
import Event from '../../../src/utils/event';
import { StateOwner, AvailableState } from '../../../src/utils/constants';
import { NotFoundError, DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('State.set', () => {
  const variable = new Variable();
  const event = new Event();
  const state = new State(event, variable);

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
  const variable = new Variable();
  const event = new Event();
  const state = new State(event, variable);

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
