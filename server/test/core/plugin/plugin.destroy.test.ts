/* eslint-disable func-names */
import { assert } from 'chai';
import { Container } from 'dockerode';
import Plugin from '../../../src/core/plugin';
import { NotFoundError } from '../../../src/utils/errors/coreError';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';
import Docker from '../../../src/core/docker';

let container: Container;

describe('Plugin.destroy', () => {
  const event = new Event();
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
    });
  });

  it('should destroy a plugin', async function () {
    this.timeout(30000);
    await plugin.destroy('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
  });

  it('should not found a plugin to destroy', async () => {
    const promise = plugin.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });
});
