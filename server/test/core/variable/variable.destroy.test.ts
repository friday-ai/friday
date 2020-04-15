import { assert } from 'chai';
import Variable from '../../../src/core/variable';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('Variable.destoy', () => {
  const variable = new Variable();

  it('should destroy a variable', async () => {
    await variable.destroy('a2b9ba3a-72f1-4a24-b268-e3813c1e8f32');
  });

  it('should not found a variable to destroy', async () => {
    const promise = variable.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });
});
