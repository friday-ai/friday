import { expect, assert } from 'chai';
import Action from '../../../src/core/action/action';
import { ActionsType } from '../../../src/config/constants';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/decorators/error';

describe('Action.create', () => {
  const action = new Action();

  it('should create a action', async () => {
    const createdAction = await action.create({
      name: 'action test',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
    });

    expect(createdAction).to.have.property('id');
    expect(createdAction).to.have.property('name');
    expect(createdAction).to.have.property('description');
    expect(createdAction).to.have.property('type');
    expect(createdAction).to.have.property('subType');
    expect(createdAction).to.have.property('variableKey');
    expect(createdAction).to.have.property('variableValue');
    expect(createdAction).to.have.property('sceneId');
  });

  it('should not create a action with an existing name', async () => {
    const promise = action.create({
      name: 'action1',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create a action with an empty name', async () => {
    const promise = action.create({
      name: '',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a action with a empty scene id', async () => {
    const promise = action.create({
      name: 'action2',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a action with a wrong scene id', async () => {
    const promise = action.create({
      name: 'action3',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '99a2e8fd-2298-40e4-93d6-9866c3261ec0',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
