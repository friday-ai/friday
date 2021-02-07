import { Container, ContainerCreateOptions } from 'dockerode';
import error, { PlatformNotCompatible } from '../../utils/errors/coreError';
import Docker from './index';

/**
 * Create a container.
 * @param {string} options - Options.
 * @returns {Promise<Container>} The created container.
 * @example
 * const createdContainer = await friday.docker.createContainer(options);
 */
export default async function createContainer(this: Docker, options: ContainerCreateOptions): Promise<Container> {
  try {
    if (!this.dockerode) {
      throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
    }

    const createdContainer = await this.dockerode.createContainer(options);
    return createdContainer;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e,
    });
  }
}
