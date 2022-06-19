import { assert } from 'chai';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Variable from '../../../src/core/variable/variable';

let variable: Variable;

describe('Variable.destroy', () => {
  before(async () => {
    variable = global.FRIDAY.variable;
  });

  it('should destroy a variable', async () => {
    await variable.destroy('a2b9ba3a-72f1-4a24-b268-e3813c1e8f32');
  });

  it('should not found a variable to destroy', async () => {
    const promise = variable.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });
});
