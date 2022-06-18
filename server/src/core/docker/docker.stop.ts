import Docker from './docker';
import { PlatformNotCompatible } from '../../utils/decorators/error';

/**
 * Restart a container with id.
 * @example
 * await friday.docker.stop('71501a8ab0f8');
 */
export default async function stop(this: Docker, id: string): Promise<any> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
  }

  const container = await this.getContainer(id);
  return container.stop();
}
