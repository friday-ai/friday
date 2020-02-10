import Script from '../../../src/core/script';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('script.destoy', () => {
  const script = new Script();

  it('should destroy a script', async () => {
    expect.assertions(0);
    await script.destroy('d354cede-3895-4dac-8a90-73d970b4617c');
  });

  it('should not found a script to destroy', async () => {
    expect.assertions(1);
    await script.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
