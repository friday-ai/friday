import { expect, assert } from 'chai';
import Action from '../../../src/core/action';
import { ActionsType } from '../../../src/utils/constants';

describe('Action.getAll', () => {
  const action = new Action();

  it('should return all actions', async () => {

    const actions = await action.getAll();

    expect(actions).to.be.an('array');
    assert.deepEqual(actions, [{
        id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
        name: 'action1',
        description: 'action1 description',
        type: ActionsType.LIGHT_TURN_ON,
        subType: '',
        variableKey: 'action1 variable key',
        variableValue: 'action1 variable value',
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
      },
      {
        id: '0e7219cf-690d-4224-a29d-dcaf3642c569',
        name: 'action2',
        description: 'action2 description',
        type: ActionsType.NOTIFICATION_SEND,
        subType: '',
        variableKey: 'action2 variable key',
        variableValue: 'action2 variable value',
        sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
      }
    ]);
  });

  it('should return all actions with full scope', async () => {

    const actions = await action.getAll({ scope: 'full' });

    expect(actions).to.be.an('array');
    actions.forEach(a => {
      expect(a).to.have.property('id');
      expect(a).to.have.property('name');
      expect(a).to.have.property('description');
      expect(a).to.have.property('type');
      expect(a).to.have.property('subType');
      expect(a).to.have.property('variableKey');
      expect(a).to.have.property('variableValue');
      expect(a).to.have.property('sceneId');

      expect(a.scene).to.be.an('object');
      expect(a.scene).to.have.property('id');
      expect(a.scene).to.have.property('name');
      expect(a.scene).to.have.property('description');
      expect(a.scene).to.have.property('triggerId');
    });

  });

});
