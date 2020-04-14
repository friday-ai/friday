import { assert } from 'chai';
import Trigger from '../../../src/core/trigger';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('Trigger.destoy', () => {
  const trigger = new Trigger();

  it('should destroy a trigger', async () => {
    await trigger.destroy('a0f02b72-73e0-4cfd-a049-5caaa0b80514');
  });

  it('should not found a trigger to destroy', async () => {
    const promise = trigger.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });

});
