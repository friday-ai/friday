import { assert, expect } from 'chai';
import Dockerode, { Container } from 'dockerode';
import Docker from '../../src/index';
import { NotFoundError, PlatformNotCompatible } from '../../src/utils/error';

let docker: Docker;
let container: Container;

describe('Docker.getContainer', () => {
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
