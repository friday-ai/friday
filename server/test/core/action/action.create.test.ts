import Action from '../../../src/core/action';
import { ActionsType } from '../../../src/utils/constants';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('action.create', () => {
  const action = new Action();

  it('should create a action', async () => {
    const createdAction = await action.create({
      id: 'b1ed196e-2754-43f0-8c86-728f043c9c07',
      name: 'action test',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
    });

    expect(createdAction).toHaveProperty('id');
    expect(createdAction).toHaveProperty('name');
    expect(createdAction).toHaveProperty('description');
    expect(createdAction).toHaveProperty('type');
    expect(createdAction).toHaveProperty('subType');
    expect(createdAction).toHaveProperty('variableKey');
    expect(createdAction).toHaveProperty('variableValue');
    expect(createdAction).toHaveProperty('sceneId');
  });

  it('should not create a action with an existing name', async () => {
    expect.assertions(1);

    await action.create({
      id: '70721298-9668-4fdf-b09c-7b8ddf6ff4d9',
      name: 'action1',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseUniqueConstraintError);
      });
  });

  it('should not create a action with an empty name', async () => {
    expect.assertions(1);

    await action.create({
      id: 'bd362b3b-21f0-4121-a967-4071b9a837c0',
      name: '',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

  it('should not create a action with a empty scene id', async () => {
    expect.assertions(1);

    await action.create({
      id: 'd175c84f-a5fc-4afb-beeb-5cd57a033844',
      name: 'action2',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: ''
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

  it('should not create a action with a wrong scene id', async () => {
    expect.assertions(1);

    await action.create({
      id: 'c79e34cc-8bbf-4134-89c0-b33c8e8761e5',
      name: 'action3',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '99a2e8fd-2298-40e4-93d6-9866c3261ec0'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

});
