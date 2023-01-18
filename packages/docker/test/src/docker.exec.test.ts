import { assert, expect } from 'chai';
import Dockerode, { Container } from 'dockerode';
import Docker from '../../src/index';
import { NotFoundError, PlatformNotCompatible } from '../../src/utils/error';

let docker: Docker;
let container: Container;

describe('Docker.exec', () => {
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

    // Start container for test
    await container.start();
  });

  after(async function after() {
    this.timeout(15000);
    await container.stop();
    await container.remove();
  });

  it('should run exec on container', async function run() {
    this.timeout(30000);
    const promise = await docker.exec(container.id, { Cmd: ['echo', 'foo'] });
    expect(promise).to.equal(true);
  });

  it('should not run exec on container', async () => {
    const promise = docker.exec('71501a8ab0f8', { Cmd: ['echo', 'foo'] });
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not run exec on container', async () => {
    // Override object to force throw for tests
    docker.dockerode = null;
    const promise = docker.exec(container.id, { Cmd: ['echo', 'foo'] });
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
