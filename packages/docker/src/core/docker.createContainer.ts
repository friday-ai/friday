import { Container, ContainerCreateOptions } from 'dockerode';
import Docker from '../index';
import { PlatformNotCompatible } from '../utils/error';

/**
 * Create a container.
 * @param {string} options - Options.
 * @returns {Promise<Container>} The created container.
 * @example
 * const createdContainer = await docker.createContainer(options);
 */
export default async function createContainer(this: Docker, options: ContainerCreateOptions): Promise<Container> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'App not running on Docker' });
  }

  // TODO: Improve this error handling
  if (options.Image === undefined || options.Image === '') {
    throw new Error('Image name is required');
  }

  const availableImages = await this.dockerode.listImages({ all: true });

  // Check if image is already available locally or pull it
  if (!availableImages.find((image) => options.Image && image.RepoTags && image.RepoTags.includes(options.Image))) {
    await this.pull(options.Image);
  }

  return this.dockerode.createContainer(options);
}
