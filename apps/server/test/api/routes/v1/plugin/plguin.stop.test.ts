import Docker from '@friday-ai/docker';
import { expect } from 'chai';
import { Container } from 'dockerode';
import Plugin from '../../../../../src/core/plugin/plugin';
import { admin, guest, habitant } from '../../../../utils/apiToken';
import server from '../../../../utils/request';

let plugin: Plugin;
let docker: Docker;
let container: Container;

describe('PATCH /api/v1/plugin/stop/:id', () => {
  // Create a fake container and save docker id on plugin
  before(async function before() {
    this.timeout(15000);
    plugin = global.FRIDAY.plugin;
    docker = global.FRIDAY.docker;

    container = await docker.createContainer({
      Image: 'alpine',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: false,
      StdinOnce: false,
    });
  });

  // Only update container id before each hook to prevent multiple useless container created
  beforeEach(async function beforeEach() {
    await container.start();
    await plugin.update('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', {
      dockerId: container.id,
    });
  });

  after(async function after() {
    this.timeout(15000);
    await container.remove({ force: true });
  });

  it('should stop a plugin', async function stop() {
    this.timeout(15000);
    await server
      .patch('/api/v1/plugin/stop/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('admin should have access to stop a plugin', async function stop() {
    this.timeout(15000);
    await server
      .patch('/api/v1/plugin/stop/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', admin)
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });
});

describe('PATCH /api/v1/plugin/stop/:id', () => {
  it("habitant should't have access to stop a plugin", async () => {
    await server.patch('/api/v1/plugin/stop/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', habitant).expect(403);
  });

  it("guest should't have access to stop a plugin", async () => {
    await server.patch('/api/v1/plugin/stop/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', guest).expect(403);
  });

  it('should not found plugin to stop', async () => {
    await server.patch('/api/v1/plugin/stop/33ddf1e2-3c51-4426-93af-3b0453ac0333').expect(404);
  });
});
