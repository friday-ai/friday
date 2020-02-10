import Variable from '../../../src/core/variable';
import { VariableOwner } from '../../../src/utils/constants';
import { DatabaseValidationError, DatabaseUniqueConstraintError } from '../../../src/utils/errors/coreError';

describe('variable.create', () => {
  const variable = new Variable();

  it('should create a variable', async () => {
    const createdVariable = await variable.create({
      id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
      key: 'key_test',
      value: 'value_test',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER
    });

    expect(createdVariable).toHaveProperty('key');
    expect(createdVariable).toHaveProperty('value');
    expect(createdVariable).toHaveProperty('owner');
    expect(createdVariable).toHaveProperty('ownerType');
  });

  it('should not create a variable with an existing key', async () => {
    expect.assertions(1);

    await variable.create({
      id: '06710c2d-3555-47ef-b8c2-1bede0ffda9c',
      key: 'key_test',
      value: 'value_test',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseUniqueConstraintError);
      });
  });

  it('should not create variable with wrong owner', async () => {
    expect.assertions(1);

    await variable.create({
      id: 'e7b49d0a-3fc8-4f65-9aee-3c4e2ee84096',
      key: 'key_test1',
      value: 'value_test',
      owner: '2f5a9f86-2612-436b-9a3b-7040dae16c0d',
      ownerType: VariableOwner.USER
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });

  });

  it('should not create variable with empty key', async () => {
    expect.assertions(1);

    await variable.create({
      id: '67dd835e-facd-463a-8f37-2e17f6993c91',
      key: '',
      value: 'value_test',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });

  });

  it('should not create variable with empty value', async () => {
    expect.assertions(1);

    await variable.create({
      id: 'e187bf18-7831-434c-8c3e-9b8a82b530da',
      key: 'key_test2',
      value: '',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });

  });
  it('should not create variable with a empty owner id', async () => {
    expect.assertions(1);

    await variable.create({
      id: '183c612c-3747-45de-9750-df90d9f39bc8',
      key: 'key_test3',
      value: 'value_test3',
      owner: '',
      ownerType: VariableOwner.USER
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });

  });
});
