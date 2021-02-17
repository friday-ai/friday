/* eslint-disable func-names */
import { expect, assert } from 'chai';
import { Container } from 'dockerode';
import Docker from '../../../src/core/docker';
import { NotFoundError } from '../../../src/utils/errors/coreError';
import wait from '../../utils/timer';

let container: Container;

describe('Docker.restart', () => {
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

  after(async function () {
    this.timeout(15000);
    await container.stop();
    await container.remove();
  });

  it('should restart a container', async function () {
    this.timeout(15000);
    let containerStatus = '';

    const handler = (e: any) => {
      const event = JSON.parse(e);
      containerStatus = event.status;
    };

    const events = await docker.dockerode!.getEvents({ filters: { container: [container.id], type: ['container'] } });
    events.on('data', handler);

    await docker.restart(container.id);
    await wait(1000);

    events.off('data', handler);
    expect(containerStatus).to.equal('restart');
  });

  it('should not restart a container', async () => {
    const promise = docker.restart('71501a8ab0f8');
    await assert.isRejected(promise, NotFoundError);
  });
});