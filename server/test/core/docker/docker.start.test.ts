/* eslint-disable func-names */
import { expect, assert } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker';
import { NotFoundError, PlatformNotCompatible } from '../../../src/utils/errors/coreError';

let container: Container;

describe('Docker.start', () => {
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
  });

  after(async function () {
    this.timeout(15000);
    await container.stop();
    await container.remove();
  });

  it('should start a container', async function () {
    this.timeout(15000);
    await docker.start(container.id);
    const containerInfos = await container.inspect();
    expect(containerInfos.State.Status).to.equal('running');
  });

  it('should not start a container', async () => {
    const promise = docker.start('71501a8ab0f8');
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not start a container', async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.start(container.id);
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
