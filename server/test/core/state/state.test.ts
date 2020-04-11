import State from '../../../src/core/state';
import Variable from '../../../src/core/variable';
import Event from '../../../src/utils/event';
import { StateOwner, AvailableState } from '../../../src/utils/constants';
import { NotFoundError, DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('state.set', () => {
  const variable = new Variable();
  const event = new Event();
  const state = new State(event, variable);

  it('should create a state', async () => {
    const createdState = await state.set({
      id: '9a05e6c3-e36a-4779-bc66-6f7d015920c7',
      owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME
    });

    expect(createdState).toHaveProperty('id');
    expect(createdState).toHaveProperty('owner');
    expect(createdState).toHaveProperty('ownerType');
    expect(createdState).toHaveProperty('value');
  });

  it('should not create a state with a empty owner id', async () => {
    expect.assertions(1);

    await state.set({
      id: '43b55c29-70d9-4213-9cce-a5f3c74ff38c',
      owner: '',
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });

  });

  it('should not create a state with a wrong owner id', async () => {
    expect.assertions(1);

    await state.set({
      id: '9a05e6c3-e36a-4779-bc66-6f7d015920c7',
      owner: '246291a1-9f31-4201-8996-0a938c54a8bf',
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });

  });

});

describe('state.getByOwner', () => {
  const variable = new Variable();
  const event = new Event();
  const state = new State(event, variable);

  it('should return a state of one owner', async () => {
    const stateRetruned = await state.getByOwner('c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a');

    expect(stateRetruned).toHaveProperty('id');
    expect(stateRetruned).toHaveProperty('owner');
    expect(stateRetruned).toHaveProperty('ownerType');
    expect(stateRetruned).toHaveProperty('value');
  });

  it('should not found state', async () => {
    expect.assertions(1);

    await state.getByOwner('639cf491-7ff5-4e76-853d-806c81e53f8d')
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

});
