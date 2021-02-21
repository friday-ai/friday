import { expect, assert } from 'chai';
import Plugin from '../../../src/core/plugin';
import { NotFoundError } from '../../../src/utils/errors/coreError';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';
import Docker from '../../../src/core/docker';

describe('Plugin.heartbeat', () => {
  const event = new Event();
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('e2cz8cc-60a7-4c40-87d2-b25048b1aa04', docker, state);

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
