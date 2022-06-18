import { expect, assert } from 'chai';
import Variable from '../../../src/core/variable/variable';
import { VariableOwner } from '../../../src/config/constants';
import { DatabaseValidationError, DatabaseUniqueConstraintError } from '../../../src/utils/decorators/error';

describe('Variable.create', () => {
  const variable = new Variable();

  it('should create a variable', async () => {
    const createdVariable = await variable.create({
      key: 'key_test',
      value: 'value_test',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER,
    });

    expect(createdVariable).to.have.property('key');
    expect(createdVariable).to.have.property('value');
    expect(createdVariable).to.have.property('owner');
    expect(createdVariable).to.have.property('ownerType');
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
