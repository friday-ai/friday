import { Action } from '../../../src/core/friday';
import 'jest-extended';

describe('action.getAll', () => {
  const action = new Action();

  it('should return all actions', async () => {

    const actions = await action.getById('33ab56b0-4064-40d0-b1f4-1e426bff1ea3');

    expect(actions).toEqual(
      {
        id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
        name: 'action1',
        description: 'action1 description',
        type: 'light.turn_on',
        subType: '',
        variableKey: 'action1 variable key',
        variableValue: 'action1 variable value',
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
      });

  });

  it('should return an action with full scope', async () => {

    const actionReturned = await action.getById('33ab56b0-4064-40d0-b1f4-1e426bff1ea3', 'full')

    expect(actionReturned).toBeObject();
    expect(actionReturned).toHaveProperty('id');
    expect(actionReturned).toHaveProperty('name');
    expect(actionReturned).toHaveProperty('description');
    expect(actionReturned).toHaveProperty('type');
    expect(actionReturned).toHaveProperty('subType');
    expect(actionReturned).toHaveProperty('variableKey');
    expect(actionReturned).toHaveProperty('variableValue');
    expect(actionReturned).toHaveProperty('sceneId');

    expect(actionReturned.scene).toBeObject();
    expect(actionReturned.scene).toHaveProperty('id');
    expect(actionReturned.scene).toHaveProperty('name');
    expect(actionReturned.scene).toHaveProperty('description');
    expect(actionReturned.scene).toHaveProperty('triggerId');

  });

});
