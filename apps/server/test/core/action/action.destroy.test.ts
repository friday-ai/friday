import { assert } from 'chai';
import Action from '../../../src/core/action/action';
import { NotFoundError } from '../../../src/utils/decorators/error';

let action: Action;

describe('Action.destroy', () => {
  before(async () => {
    action = global.FRIDAY.action;
  });

  it('should destroy an action', async () => {
    await action.destroy('33ab56b0-4064-40d0-b1f4-1e426bff1ea3');
  });

  it('should not found an action to destroy', async () => {
    const promise = action.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });
});
