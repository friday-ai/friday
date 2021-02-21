/* eslint-disable func-names */
import { expect } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker';

let container: Container;

describe('Docker.createContainer', () => {
  const docker = new Docker();

  after((done) => {
    container.remove(done);
  });

  it('should create a container', async () => {
    container = await docker.createContainer({
      Image: 'hello-world',
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ['/bin/bash', '-c', 'tail -f /etc/resolv.conf'],
      OpenStdin: false,
      StdinOnce: false,
    });

    const containerInfos = await container.inspect();
    expect(containerInfos.State.Status).to.equal('created');
  });
});
