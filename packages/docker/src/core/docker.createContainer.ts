import { Container, ContainerCreateOptions } from 'dockerode';
import { PlatformNotCompatible } from '../utils/error';
import Docker from '../index';

/**
 * Create a container.
 * @param {string} options - Options.
 * @returns {Promise<Container>} The created container.
 * @example
 * const createdContainer = await friday.docker.createContainer(options);
 */
export default async function createContainer(this: Docker, options: ContainerCreateOptions): Promise<Container> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
  }

  return this.dockerode.createContainer(options);
}
