/* eslint-disable func-names */
import { expect, assert } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker';
import { NotFoundError, PlatformNotCompatible } from '../../../src/utils/errors/coreError';

let container: Container;

describe('Docker.stop', () => {
  const docker = new Docker();

  before(async function () {
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

    // Start container for test
    await container.start();
  });

  after((done) => {
    container.remove(done);
  });

  it('should stop a container', async function () {
    this.timeout(15000);
    await docker.stop(container.id);
    const containerInfos = await container.inspect();
    expect(containerInfos.State.Status).to.equal('exited');
  });

  it('should not stop a container', async () => {
    const promise = docker.stop('71501a8ab0f8');
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not stop a container', async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.stop(container.id);
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
