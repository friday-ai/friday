import { assert, expect } from 'chai';
import Dockerode, { Container } from 'dockerode';
import Docker from '../../src/index';
import { PlatformNotCompatible } from '../../src/utils/error';

let docker: Docker;
let container1: Container;
let container2: Container;

describe('Docker.listAllContainers', () => {
  before(async () => {
    docker = global.DOCKER;
    // Override object for tests
    docker.dockerode = new Dockerode();
  });

  before(async function before() {
    this.timeout(15000);
    container1 = await docker.createContainer({
      name: 'friday_test_container1',
      Image: 'alpine',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: false,
      StdinOnce: false,
    });

    container2 = await docker.createContainer({
      name: 'friday_test_container2',
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
    container1.remove();
    container2.remove(done);
  });

  it('should return all containers', async () => {
    const containers = await docker.getAllContainers();

    expect(containers).to.be.an('array');
    expect(containers).that.contains.something.like({ Names: ['/friday_test_container1'] });
    expect(containers).that.contains.something.like({ Names: ['/friday_test_container2'] });
  });

  it('should not return containers', async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.getAllContainers();
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
