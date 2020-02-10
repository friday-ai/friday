import Variable from '../../../src/core/variable';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('variable.destoy', () => {
  const variable = new Variable();

  it('should destroy a variable', async () => {
    expect.assertions(0);
    await variable.destroy('a2b9ba3a-72f1-4a24-b268-e3813c1e8f32');
  });

  it('should not found a variable to destroy', async () => {
    expect.assertions(1);
    await variable.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
