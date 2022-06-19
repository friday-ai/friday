/* eslint-disable func-names */
import { assert, expect } from 'chai';
import Docker from '../../../src/core/docker/docker';
import { CoreError, PlatformNotCompatible } from '../../../src/utils/decorators/error';
import Dockerode from 'dockerode';

let docker: Docker;

describe('Docker.pull', () => {
  before(async () => {
    docker = global.FRIDAY.docker;
    // Override object for tests
    docker.dockerode = new Dockerode();
  });

  it('should pull an image', async function () {
    this.timeout(1500);
    await docker.pull('alpine:latest');
    const images = await docker.dockerode?.listImages();
    expect(images).that.contains.something.like({ RepoTags: ['alpine:latest'] });
  });

  it('should not pull an image', async () => {
    const promise = docker.pull('ubuntu:azeaze');
    await assert.isRejected(promise, CoreError);
  });

  it('should not pull an image', async () => {
    // Override object to force throw for tests
    docker.dockerode = null;

    const promise = docker.pull('alpine:latest');
    await assert.isRejected(promise, PlatformNotCompatible);
  });
});
