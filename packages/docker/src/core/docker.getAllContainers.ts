import { ContainerInfo } from 'dockerode';
import Docker from '../index';
import { PlatformNotCompatible } from '../utils/error';

/**
 * Get all containers.
 * @returns {Promise<ContainerInfo[]>} Resolve with container array.
 * @example
 * const containers = await docker.getAllContainers();
 */
export default async function getAllContainers(this: Docker): Promise<ContainerInfo[]> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'App not running on Docker' });
  }

  return this.dockerode.listContainers({ all: true });
}
