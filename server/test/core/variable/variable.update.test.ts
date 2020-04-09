import Variable from '../../../src/core/variable';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('variable.update', () => {
  const variable = new Variable();

  it('should update a variable with a id', async () => {

    const updatedVariable = await variable.update('a2b9ba3a-72f1-4a24-b268-e3813c1e8f32', {
      value: 'value_updated'
    });

    expect(updatedVariable.value).toEqual('value_updated');
  });

  it('should update a variable with a key', async () => {

    const updatedVariable = await variable.update('test_key0', {
      value: 'value_updated2'
    });

    expect(updatedVariable.value).toEqual('value_updated2');
  });

  it('should not found variable to update', async () => {
    expect.assertions(1);

    await variable.update('a2b9ba3a-72f1-4a24-b268-e3813c1e8333', {
      value: 'value_updated'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });
  });
});
