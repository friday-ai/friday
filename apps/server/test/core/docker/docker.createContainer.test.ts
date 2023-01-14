import { assert, expect } from 'chai';
import Dockerode, { Container } from 'dockerode';
import Docker from '../../../src/core/docker/docker';
import { PlatformNotCompatible } from '../../../src/utils/decorators/error';

let docker: Docker;
let container: Container;

describe('Docker.createContainer', () => {
  before(async () => {
    docker = global.FRIDAY.docker;
    // Override object for tests
    docker.dockerode = new Dockerode();
  });

  after((done) => {
    container.remove(done);
  });

  it('should create a container', async () => {
    container = await docker.createContainer({
      Image: 'alpine',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: false,
      StdinOnce: false,
    });

    const containerInfos = await container.inspect();
    expect(containerInfos.State.Status).to.equal('created');
  });

  it('should not create a container', async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.createContainer({
      Image: 'alpine',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: false,
      StdinOnce: false,
    });

    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
