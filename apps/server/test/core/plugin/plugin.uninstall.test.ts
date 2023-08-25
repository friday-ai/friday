import { assert } from 'chai';
import Dockerode, { Container } from 'dockerode';
import Plugin from '../../../src/core/plugin/plugin';
import { NotFoundError } from '../../../src/utils/decorators/error';

let plugin: Plugin;
let container: Container;

describe('Plugin.uninstall', () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
    // Override object for tests
    global.FRIDAY.docker.dockerode = new Dockerode();

    // Create a fake container and save docker id on plugin
    container = await global.FRIDAY.docker.createContainer({
      Image: 'alpine',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: false,
      StdinOnce: false,
    });

    await plugin.update('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', {
      dockerId: container.id,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    });
  });

  it('should uninstall a plugin', async function destroy() {
    this.timeout(30000);
    await plugin.destroy('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
  });

  it('should uninstall a plugin even if it not found container', async function destroy() {
    await plugin.destroy('88b48273-15e6-4729-9199-0682677475f4');
  });

  it('should not found a plugin to uninstall', async () => {
    const promise = plugin.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });
});
