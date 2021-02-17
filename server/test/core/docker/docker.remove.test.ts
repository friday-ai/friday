/* eslint-disable func-names */
import { assert } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker';
import { NotFoundError } from '../../../src/utils/errors/coreError';

let container: Container;

describe('Docker.remove', () => {
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

  it('should remove a container', async function () {
    this.timeout(15000);
    await docker.remove(container.id);
    const promise = docker.getContainer(container.id);
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not remove a container', async () => {
    const promise = docker.remove('71501a8ab0f8');
    await assert.isRejected(promise, NotFoundError);
  });
});