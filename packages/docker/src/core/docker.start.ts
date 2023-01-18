import Docker from '../index';
import { PlatformNotCompatible } from '../utils/error';

/**
 * Restart a container with id.
 * @example
 * await friday.docker.start('71501a8ab0f8');
 */
export default async function start(this: Docker, id: string): Promise<void> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
  }

  const container = await this.getContainer(id);
  return container.start();
}
