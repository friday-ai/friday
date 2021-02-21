/* eslint-disable func-names */
import { assert, expect } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker';
import { NotFoundError } from '../../../src/utils/errors/coreError';

let container: Container;

describe('Docker.exec', () => {
  const docker = new Docker();

  before(async function () {
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

  after(async function () {
    this.timeout(15000);
    await container.stop();
    await container.remove();
  });

  it('should run exec on container', async function () {
    this.timeout(30000);
    const promise = await docker.exec(container.id, { Cmd: ['echo', 'foo'] });
    expect(promise).to.equal(true);
  });

  it('should not run exec on container', async () => {
    const promise = docker.exec('71501a8ab0f8', { Cmd: ['echo', 'foo'] });
    await assert.isRejected(promise, NotFoundError);
  });
});
