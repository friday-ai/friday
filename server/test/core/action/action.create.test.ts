import { Action } from '../../../src/core/friday';
import { ActionsType } from '../../../src/utils/constants';
import { DatabaseUniqueConstraintError } from '../../../src/utils/error';

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
      .catch((err) => {
        expect(err).toBeInstanceOf(DatabaseUniqueConstraintError);
      });
  });

});
