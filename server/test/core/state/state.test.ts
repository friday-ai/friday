import State from '../../../src/core/state';
import { StateOwner, AvailableState } from '../../../src/utils/constants';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('state.set', () => {
  const state = new State();

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

});

describe('state.getByOwner', () => {
  const state = new State();

  it('should return a state of one owner', async () => {
    const stateRetruned = await state.getByOwner('c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a');

    expect(stateRetruned).toHaveProperty('id');
    expect(stateRetruned).toHaveProperty('owner');
    expect(stateRetruned).toHaveProperty('ownerType');
    expect(stateRetruned).toHaveProperty('value');
  });

  it('should not found state', async () => {

    await state.getByOwner('639cf491-7ff5-4e76-853d-806c81e53f8d')
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

});
