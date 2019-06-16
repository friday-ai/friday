import { Variable } from '../../../src/core/friday';
import { VariableOwner } from '../../../src/utils/constants';

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

    await variable.create({
      id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
      key: 'key_test',
      value: 'value_test',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER
    })
      .catch((err) => {
        expect(`${err}`).toContain('Validation error');
      });
  });

  it('should not create variable with wrong owner', async () => {

    await variable.create({
      id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
      key: 'key_test',
      value: 'value_test',
      owner: '2f5a9f86-2612-436b-9a3b-7040dae16c0d',
      ownerType: VariableOwner.USER
    })
      .catch((err) => {
        expect(`${err}`).toContain('Validation error');
      });

  });
  it('should not create variable with empty key', async () => {

    await variable.create({
      id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
      key: '',
      value: 'value_test',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER
    })
      .catch((err) => {
        expect(`${err}`).toContain('Validation error');
      });

  });
  it('should not create variable with empty value', async () => {

    await variable.create({
      id: 'a675b2e6-9d1d-40f5-943b-86785e894735',
      key: 'key_test',
      value: '',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: VariableOwner.USER
    })
      .catch((err) => {
        expect(`${err}`).toContain('Validation error');
      });

  });
});
