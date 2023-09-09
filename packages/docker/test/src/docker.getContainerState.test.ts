import { assert, expect } from 'chai';
import Dockerode, { Container } from 'dockerode';
import Docker from '../../src/index';
import { NotFoundError, PlatformNotCompatible } from '../../src/utils/error';

let docker: Docker;
let container: Container;

describe('Docker.getContainerState', () => {
  before(async () => {
    docker = global.DOCKER;
    // Override object for tests
    docker.dockerode = new Dockerode();
  });

  before(async function before() {
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

  it('should return a container state', async () => {
    const state = await docker.getContainerState(container.id);
    expect(state).to.be.an('string');
    expect(state).to.equal('created');
  });

  it('should not return a container state', async () => {
    const promise = docker.getContainerState('71501a8ab0f8');
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not return a container state', async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.getContainerState(container.id);
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
