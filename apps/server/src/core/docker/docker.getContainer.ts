import { Container } from 'dockerode';
import Docker from './docker';
import { NotFoundError, PlatformNotCompatible } from '../../utils/decorators/error';

/**
 * Get a container by id.
 * @returns {Promise<ContainerInfo>} Resolve with container info.
 * @example
 * const container = await friday.docker.getContainer('71501a8ab0f8');
 */
export default async function getContainer(this: Docker, id: string): Promise<Container> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
  }

  const containers = await this.dockerode.listContainers({ all: true, filters: { id: [id] } });

  if (containers.length === 0) {
    throw new NotFoundError({ name: 'Get Container by id', message: 'Container not found', metadata: id });
  }

  // Return container object and not container infos
  return this.dockerode.getContainer(containers[0].Id);
}
