/* eslint-disable func-names */
import { expect, assert } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker';
import { NotFoundError } from '../../../src/utils/errors/coreError';

let container: Container;

describe('Docker.getContainer', () => {
  const docker = new Docker();

  before(async function () {
    this.timeout(15000);
    container = await docker.createContainer({
      Image: 'ubuntu',
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
    container.remove(done);
  });

  it('should return a container', async () => {
    const containerObj = await docker.getContainer(container.id);
    const containerInfos = await containerObj.inspect();
    expect(containerObj).to.be.instanceOf(Container);
    expect(containerInfos.Config.Image).to.equal('ubuntu');
  });

  it('should not return a container', async () => {
    const promise = docker.getContainer('71501a8ab0f8');
    await assert.isRejected(promise, NotFoundError);
  });
});
