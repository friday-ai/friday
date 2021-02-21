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
});
