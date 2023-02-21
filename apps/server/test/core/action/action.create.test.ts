import { assert } from 'chai';
import { ActionCreationAttributes, ActionsType } from '@friday-ai/shared';
import Action from '../../../src/core/action/action';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/decorators/error';

let action: Action;

describe('Action.create', () => {
  before(async () => {
    action = global.FRIDAY.action;
  });

  it('should create a action', async () => {
    const actionToCreate: ActionCreationAttributes = {
      name: 'action test',
      description: 'action test description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action test variable key',
      variableValue: 'action test variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
    };

    const createdAction = await action.create(actionToCreate);

    assert.deepInclude(createdAction, actionToCreate);
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
