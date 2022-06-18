import { expect, assert } from 'chai';
import Action from '../../../src/core/action/action';
import { ActionsType } from '../../../src/config/constants';
import { NotFoundError } from '../../../src/utils/decorators/error';

describe('Action.getById', () => {
  const action = new Action();

  it('should return all actions', async () => {
    const actions = await action.getById('33ab56b0-4064-40d0-b1f4-1e426bff1ea3');

    expect(actions).to.be.an('object');
    assert.deepEqual(actions, {
      id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
      name: 'action1',
      description: 'action1 description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action1 variable key',
      variableValue: 'action1 variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
    });
  });

  it('should return an action with full scope', async () => {
    const actionReturned = await action.getById('33ab56b0-4064-40d0-b1f4-1e426bff1ea3', 'full');

    expect(actionReturned).to.be.an('object');
    expect(actionReturned).to.have.property('id');
    expect(actionReturned).to.have.property('name');
    expect(actionReturned).to.have.property('description');
    expect(actionReturned).to.have.property('type');
    expect(actionReturned).to.have.property('subType');
    expect(actionReturned).to.have.property('variableKey');
    expect(actionReturned).to.have.property('variableValue');
    expect(actionReturned).to.have.property('sceneId');

    expect(actionReturned.scene).to.be.an('object');
    expect(actionReturned.scene).to.have.property('id');
    expect(actionReturned.scene).to.have.property('name');
    expect(actionReturned.scene).to.have.property('description');
    expect(actionReturned.scene).to.have.property('triggerId');
  });

  it('should not found an action', async () => {
    const promise = action.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
