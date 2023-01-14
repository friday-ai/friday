import { assert, expect } from 'chai';
import Plugin from '../../../src/core/plugin/plugin';
import { NotFoundError } from '../../../src/utils/decorators/error';

let plugin: Plugin;

describe('Plugin.update', () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
  });

  it('should update a plugin', async () => {
    const updatedPlugin = await plugin.update('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', {
      name: 'Plugin updated',
    });

    expect(updatedPlugin.name).to.equal('Plugin updated');
  });

  it('should not found plugin to update', async () => {
    const promise = plugin.update('580efda9-6fa1-4bef-865f-d4ef04ea57d6', {
      name: 'Plugin updated',
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
