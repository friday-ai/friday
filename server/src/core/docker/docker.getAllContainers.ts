import { ContainerInfo } from 'dockerode';
import Docker from './index';
import error, { PlatformNotCompatible } from '../../utils/errors/coreError';

/**
 * Get all containers.
 * @returns {Promise<ContainerInfo[]>} Resolve with container array.
 * @example
 * const containers = await friday.docker.getAllContainers();
 */
export default async function getAllContainers(this: Docker): Promise<ContainerInfo[]> {
  try {
    if (!this.dockerode) {
      throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
    }

    return this.dockerode.listContainers({ all: true });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e,
    });
  }
}
