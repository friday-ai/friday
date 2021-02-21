/* eslint-disable func-names */
import { expect } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker';

let container1: Container;
let container2: Container;

describe('Docker.getAllContainers', () => {
  const docker = new Docker();

  before(async function () {
    this.timeout(15000);
    container1 = await docker.createContainer({
      name: 'friday_test_container1',
      Image: 'hello-world',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ['/bin/bash', '-c', 'tail -f /etc/resolv.conf'],
      OpenStdin: false,
      StdinOnce: false,
    });

    container2 = await docker.createContainer({
      name: 'friday_test_container2',
      Image: 'hello-world',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ['/bin/bash', '-c', 'tail -f /etc/resolv.conf'],
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
});
