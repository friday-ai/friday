import { expect, assert } from 'chai';
import Variable from '../../../src/core/variable';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('Variable.update', () => {
  const variable = new Variable();

  it('should update a variable with a id', async () => {
    const updatedVariable = await variable.update('a2b9ba3a-72f1-4a24-b268-e3813c1e8f32', {
      value: 'value_updated'
    });

    expect(updatedVariable.value).to.equal('value_updated');
  });

  it('should update a variable with a key', async () => {
    const updatedVariable = await variable.update('test_key0', {
      value: 'value_updated2'
    });

    expect(updatedVariable.value).to.equal('value_updated2');
  });

  it('should not found variable to update', async () => {
    const promise = variable.update('a2b9ba3a-72f1-4a24-b268-e3813c1e8333', {
      value: 'value_updated'
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
