import Plugin from '../../../src/core/plugin';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('plugin.destoy', () => {
  const plugin = new Plugin();

  it('should destroy a plugin', async () => {
    expect.assertions(0);
    await plugin.destroy('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
  });

  it('should not found a plugin to destroy', async () => {
    expect.assertions(1);
    await plugin.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
