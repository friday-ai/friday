import { expect, assert } from 'chai';
import Action from '../../../src/core/action';
import { ActionsType } from '../../../src/utils/constants';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('Action.create', () => {
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
      id: '70721298-9668-4fdf-b09c-7b8ddf6ff4d9',
      name: 'action1',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create a action with an empty name', async () => {

    const promise = action.create({
      id: 'bd362b3b-21f0-4121-a967-4071b9a837c0',
      name: '',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e'
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a action with a empty scene id', async () => {

    const promise = action.create({
      id: 'd175c84f-a5fc-4afb-beeb-5cd57a033844',
      name: 'action2',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: ''
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a action with a wrong scene id', async () => {

    const promise = action.create({
      id: 'c79e34cc-8bbf-4134-89c0-b33c8e8761e5',
      name: 'action3',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '99a2e8fd-2298-40e4-93d6-9866c3261ec0'
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

});
