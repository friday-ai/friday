import { assert } from 'chai';
import { VariableOwner } from '@friday-ai/shared';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/decorators/error';
import Variable from '../../../src/core/variable/variable';

let variable: Variable;

describe('Variable.create', () => {
  before(async () => {
    variable = global.FRIDAY.variable;
  });

  it('should create a variable', async () => {
    const variableToCreate = {
      key: 'key_test',
      value: 'value_test',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER,
    };

    const createdVariable = await variable.create(variableToCreate);

    assert.deepInclude(createdVariable, variableToCreate);
  });

  it('should not create a variable with an existing key', async () => {
    const promise = variable.create({
      key: 'test_key0',
      value: 'value_test',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER,
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create variable with wrong owner', async () => {
    const promise = variable.create({
      key: 'key_test1',
      value: 'value_test',
      owner: '2f5a9f86-2612-436b-9a3b-7040dae16c0d',
      ownerType: VariableOwner.USER,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create variable with empty key', async () => {
    const promise = variable.create({
      key: '',
      value: 'value_test',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create variable with empty value', async () => {
    const promise = variable.create({
      key: 'key_test2',
      value: '',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
  it('should not create variable with a empty owner id', async () => {
    const promise = variable.create({
      key: 'key_test3',
      value: 'value_test3',
      owner: '',
      ownerType: VariableOwner.USER,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
