import Variable from '../../../src/core/variable';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('variable.update', () => {
  const variable = new Variable();

  it('should update a variable', async () => {

    const updatedVariable = await variable.update('a2b9ba3a-72f1-4a24-b268-e3813c1e8f32', {
      value: 'value_updated'
    });

    expect(updatedVariable.value).toEqual('value_updated');
  });

  it('should not found variable to update', async () => {

    await variable.update('a2b9ba3a-72f1-4a24-b268-e3813c1e8333', {
      value: 'value_updated'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });
  });
});
