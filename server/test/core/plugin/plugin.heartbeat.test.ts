import { assert, expect } from 'chai';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Plugin from '../../../src/core/plugin/plugin';

let plugin: Plugin;

describe('Plugin.heartbeat', () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
  });

  it('should send heartbeat of plugin', async () => {
    const pluginReturned = await plugin.heartbeat('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
    expect(pluginReturned).to.contains.keys(
      ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
    );
  });

  it('should not send heartbeat of plugin', async () => {
    const promise = plugin.heartbeat('580efda9-6fa1-4bef-865f-d4ef04ea57d6');
    await assert.isRejected(promise, NotFoundError);
  });
});
