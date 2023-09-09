import Docker from '../index';
import { NotFoundError, PlatformNotCompatible } from '../utils/error';

/**
 * Get a container's state.
 * @returns {Promise<string>} Resolve with container's state.
 * @example
 * const state = await docker.getContainerState('71501a8ab0f8');
 */
export default async function getContainerState(this: Docker, id: string): Promise<string> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'App not running on Docker' });
  }

  const container = this.dockerode.getContainer(id);

  if (container === null) {
    throw new NotFoundError({ name: 'Get Container by id', message: 'Container not found', metadata: id });
  }

  const infos = await container.inspect();

  // Return container object and not container infos
  return infos.State.Status;
}
