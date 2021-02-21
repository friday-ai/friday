/* eslint-disable func-names */
import { expect } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../../../src/core/docker';
import Event from '../../../../../src/utils/event';
import Variable from '../../../../../src/core/variable';
import State from '../../../../../src/core/state';
import Plugin from '../../../../../src/core/plugin';
import server from '../../../../utils/request';
import { admin, guest, habitant } from '../../../../utils/apiToken';

let container: Container;

describe('DELETE /api/v1/plugin/:id', () => {
  const event = new Event();
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('e2cz8cc-60a7-4c40-87d2-b25048b1aa04', docker, state);

  // Create a fake container and save docker id on plugin
  beforeEach(async function () {
    this.timeout(15000);
    container = await docker.createContainer({
      Image: 'hello-world',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ['/bin/bash', '-c', 'tail -f /etc/resolv.conf'],
      OpenStdin: false,
      StdinOnce: false,
    });

    await plugin.update('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', {
      dockerId: container.id,
    });
  });

  it('should delete a plugin', async () => {
    await server
      .delete('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('admin should have access to delete a plugin', async () => {
    await server
      .delete('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', admin)
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });
});

describe('DELETE /api/v1/plugin/:id', () => {
  it('habitant should\'t have access to delete a plugin', async () => {
    await server
      .delete('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', habitant)
      .expect(403);
  });

  it('guest should\'t have access to delete a plugin', async () => {
    await server
      .delete('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', guest)
      .expect(403);
  });

  it('should not found plugin to delete', async () => {
    await server
      .delete('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0333')
      .expect(404);
  });
});
