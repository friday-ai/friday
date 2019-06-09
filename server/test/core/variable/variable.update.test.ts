import { Variable } from '../../../src/core/friday';

describe('variable.update', () => {
  const variable = new Variable();

  it('should update a variable', async () => {

    const updatedVariable = await variable.update({
      key: 'test_key0',
      value: 'value_updated'
    });

    expect(updatedVariable.value).toEqual('value_updated');
  });

  it('should not found variable to update', async () => {

    await variable.update({
      key: 'key100'
    })
      .catch((err) => {
        expect(`${err}`).toContain('Variable not found');
      });
  });

  it('should not found variable\'s key to update', async () => {

    await variable.update({
      key: ''
    })
      .catch((err) => {
        expect(`${err}`).toContain('Variable\'s key must be specified');
      });
  });
});
