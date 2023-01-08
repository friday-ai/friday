import { assert, expect } from 'chai';
import Variable from '../../../src/core/variable/variable';
import {
  BadParametersError,
  NotFoundError,
} from '../../../src/utils/decorators/error';

let variable: Variable;

describe('Variable.update', () => {
  before(async () => {
    variable = global.FRIDAY.variable;
  });

  it('should update a variable with a id', async () => {
    const updatedVariable = await variable.update('a2b9ba3a-72f1-4a24-b268-e3813c1e8f32', {
      value: 'value_updated',
    });

    expect(updatedVariable.value).to.equal('value_updated');
  });

  it('should update a variable with a key', async () => {
    const updatedVariable = await variable.update('test_key0', {
      value: 'value_updated2',
    });

    expect(updatedVariable.value).to.equal('value_updated2');
  });

  it('should not found variable to update', async () => {
    const promise = variable.update('a2b9ba3a-72f1-4a24-b268-e3813c1e8333', {
      value: 'value_updated',
    });

    await assert.isRejected(promise, NotFoundError);
  });

  it('should not update an variable with empty id', async () => {
    const promise = variable.update('', {
      value: 'value_updated',
    });

    await assert.isRejected(promise, BadParametersError);
  });
});
