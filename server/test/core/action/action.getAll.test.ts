import { Action } from '../../../src/core/friday';
import 'jest-extended';

describe('action.getAll', () => {
  const action = new Action();

  it('should return all actions', async () => {

    const actions = await action.getAll();

    expect(actions).toEqual([
      {
        id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
        name: 'action1',
        description: 'action1 description',
        type: 'light.turn_on',
        subType: '',
        variableKey: 'action1 variable key',
        variableValue: 'action1 variable value',
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
      },
      {
        id: '0e7219cf-690d-4224-a29d-dcaf3642c569',
        name: 'action2',
        description: 'action2 description',
        type: 'notification.send',
        subType: '',
        variableKey: 'action2 variable key',
        variableValue: 'action2 variable value',
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
      }
    ]);

  });

  it('should return all actions with full scope', async () => {

    const actions = await action.getAll({ scope: 'full' });

    expect(actions).toBeArray();
    actions.forEach(a => {
      expect(a).toHaveProperty('id');
      expect(a).toHaveProperty('name');
      expect(a).toHaveProperty('description');
      expect(a).toHaveProperty('type');
      expect(a).toHaveProperty('subType');
      expect(a).toHaveProperty('variableKey');
      expect(a).toHaveProperty('variableValue');
      expect(a).toHaveProperty('sceneId');

      expect(a.scene).toBeObject();
      expect(a.scene).toHaveProperty('id');
      expect(a.scene).toHaveProperty('name');
      expect(a.scene).toHaveProperty('description');
      expect(a.scene).toHaveProperty('triggerId');

    });

  });

});
