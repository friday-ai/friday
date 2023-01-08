import { ContainerInfo } from 'dockerode';
import Docker from './docker';
import { PlatformNotCompatible } from '../../utils/decorators/error';

/**
 * Get all containers.
 * @returns {Promise<ContainerInfo[]>} Resolve with container array.
 * @example
 * const containers = await friday.docker.getAllContainers();
 */
export default async function getAllContainers(this: Docker): Promise<ContainerInfo[]> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
  }

  return this.dockerode.listContainers({ all: true });
}
