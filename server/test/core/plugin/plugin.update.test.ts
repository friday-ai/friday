import { expect, assert } from 'chai';
import Plugin from '../../../src/core/plugin';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('Plugin.update', () => {
  const plugin = new Plugin();

  it('should update a plugin', async () => {
    const updatedPlugin = await plugin.update('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', {
      id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      name: 'Plugin update',
    });

    expect(updatedPlugin.name).to.equal('Plugin update');
  });

  it('should not found plugin to update', async () => {
    const promise = plugin.update('580efda9-6fa1-4bef-865f-d4ef04ea57d6', {
      id: '14c39f7a-fdda-453b-ab0a-7c47d36b90f8',
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
