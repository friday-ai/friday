import { assert, expect } from 'chai';
import Docker from '../../../src/core/docker';
import { BaseCoreError } from '../../../src/utils/errors/coreError';

describe('Docker.pull', () => {
  const docker = new Docker();

  it('should pull an image', async () => {
    await docker.pull('alpine:latest');
    const images = await docker.dockerode?.listImages();
    expect(images).that.contains.something.like({ RepoTags: ['alpine:latest'] });
  });

  it('should not pull an image', async () => {
    const promise = docker.pull('ubuntu:azeaze');
    await assert.isRejected(promise, BaseCoreError);
  });
});
