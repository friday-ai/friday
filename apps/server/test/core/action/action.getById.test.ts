import { assert, expect } from 'chai';
import Action from '../../../src/core/action/action';
import { NotFoundError } from '../../../src/utils/decorators/error';

let action: Action;

describe('Action.getById', () => {
  before(async () => {
    action = global.FRIDAY.action;
  });

  it('should return all actions', async () => {
    const a = await action.getById('33ab56b0-4064-40d0-b1f4-1e426bff1ea3');

    expect(a).to.be.an('object');
    expect(a).to.contains.keys(['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId']);
    expect(a.id).to.equal('33ab56b0-4064-40d0-b1f4-1e426bff1ea3');
  });

  it('should return an action with full scope', async () => {
    const a = await action.getById('33ab56b0-4064-40d0-b1f4-1e426bff1ea3', 'full');

    expect(a).to.be.an('object');
    expect(a).to.contains.keys(['id', 'name', 'description', 'type', 'subType', 'variableKey', 'variableValue', 'sceneId', 'scene']);
    expect(a.scene).to.contains.keys(['id', 'name', 'description', 'triggerId']);
    expect(a.id).to.equal('33ab56b0-4064-40d0-b1f4-1e426bff1ea3');
  });

  it('should not found an action', async () => {
    const promise = action.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
