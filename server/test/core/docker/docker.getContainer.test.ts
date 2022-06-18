/* eslint-disable func-names */
import { expect, assert } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker/docker';
import { NotFoundError, PlatformNotCompatible } from '../../../src/utils/decorators/error';

let container: Container;

describe('Docker.getContainer', () => {
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

  after((done) => {
    container.remove(done);
  });

  it('should return a container', async () => {
    const containerObj = await docker.getContainer(container.id);
    const containerInfos = await containerObj.inspect();
    expect(containerObj).to.be.instanceOf(Container);
    expect(containerInfos.Config.Image).to.equal('alpine');
  });

  it('should not return a container', async () => {
    const promise = docker.getContainer('71501a8ab0f8');
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not return a container', async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.getContainer(container.id);
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
