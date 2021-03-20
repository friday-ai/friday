/* eslint-disable func-names */
import { assert } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker';
import { NotFoundError, PlatformNotCompatible } from '../../../src/utils/errors/coreError';

let container: Container;

describe('Docker.remove', () => {
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

  it('should remove a container', async function () {
    this.timeout(15000);
    await docker.remove(container.id);
    const promise = docker.getContainer(container.id);
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not remove a container', async () => {
    const promise = docker.remove('71501a8ab0f8');
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not remove a container', async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.remove(container.id);
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
