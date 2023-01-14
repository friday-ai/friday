import { assert, expect } from 'chai';
import Dockerode, { Container } from 'dockerode';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Plugin from '../../../src/core/plugin/plugin';

let plugin: Plugin;
let container: Container;

describe('Plugin.stop', () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
    // Override object for tests
    global.FRIDAY.docker.dockerode = new Dockerode();
  });

  // Create a fake container and save docker id on plugin
  beforeEach(async function beforeEach() {
    this.timeout(15000);
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
    });

    // Start container for test
    await container.start();
  });

  after(async function after() {
    this.timeout(15000);
    await container.stop();
    await container.remove();
  });

  it('should stop a plugin', async function stop() {
    this.timeout(15000);
    const result = await plugin.stop('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
    expect(result).to.equal(true);
  });

  it('should not found a plugin to stop', async () => {
    const promise = plugin.stop('580efda9-6fa1-4bef-865f-d4ef04ea57d6');
    await assert.isRejected(promise, NotFoundError);
  });
});
