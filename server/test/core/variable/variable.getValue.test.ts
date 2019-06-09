import { Variable } from '../../../src/core/friday';

describe('variable.getValue', () => {
  const variable = new Variable();

  it('should return a variable', async () => {

    const variableReturned = await variable.getValue('test_key0');

    expect(variableReturned).toEqual({
      id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
      key: 'test_key0',
      value: 'test_value0',
      owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      owner_type: 'user'
    });
  });

  it('should not found variable to return', async () => {

    await variable.getValue('key100')
      .catch((err) => {
        expect(`${err}`).toContain('Variable not found');
      });
  });

  it('should not found variable with empty key', async () => {

    await variable.getValue('')
      .catch((err) => {
        expect(`${err}`).toContain('Variable\'s key can not be empty');
      });
  });
});
