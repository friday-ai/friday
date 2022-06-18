/* eslint-disable func-names */
import { assert, expect } from 'chai';
import { Container } from 'dockerode';
import Plugin from '../../../src/core/plugin/plugin';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable/variable';
import State from '../../../src/core/state/state';
import Docker from '../../../src/core/docker/docker';

let container: Container;

describe('Plugin.stop', () => {
  const event = Event;
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('e2cz8cc-60a7-4c40-87d2-b25048b1aa04', docker, state);

  // Create a fake container and save docker id on plugin
  beforeEach(async function () {
    this.timeout(15000);
    container = await docker.createContainer({
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

    // Start container for test
    await container.start();
  });

  after(async function () {
    this.timeout(15000);
    await container.stop();
    await container.remove();
  });

  it('should stop a plugin', async function () {
    this.timeout(15000);
    const result = await plugin.stop('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
    expect(result).to.equal(true);
  });

  it('should not found a plugin to stop', async () => {
    const promise = plugin.stop('580efda9-6fa1-4bef-865f-d4ef04ea57d6');
    await assert.isRejected(promise, NotFoundError);
  });
});
