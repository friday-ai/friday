import Docker from './index';
import error, { PlatformNotCompatible } from '../../utils/errors/coreError';

/**
 * Restart a container with id.
 * @example
 * await friday.docker.restart('71501a8ab0f8');
 */
export default async function restart(this: Docker, id: string): Promise<any> {
  try {
    if (!this.dockerode) {
      throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
    }

    const container = await this.getContainer(id);
    return await container.restart();
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
