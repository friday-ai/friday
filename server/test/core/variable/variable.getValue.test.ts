import { expect, assert } from 'chai';
import Variable from '../../../src/core/variable';
import { NotFoundError, BadParametersError } from '../../../src/utils/errors/coreError';
import { VariableOwner } from '../../../src/utils/constants';

describe('Variable.getValue', () => {
  const variable = new Variable();

  it('should return a variable', async () => {

    const variableReturned = await variable.getValue('test_key0');

    expect(variableReturned).to.be.an('object');
    assert.deepEqual(variableReturned, {
      id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
      key: 'test_key0',
      value: 'test_value0',
      owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      ownerType: VariableOwner.USER
    });
  });

  it('should not found variable to return', async () => {
    const promise = variable.getValue('key100');
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not found variable with empty key', async () => {
    const promise = variable.getValue('');
    await assert.isRejected(promise, BadParametersError);
  });
});
