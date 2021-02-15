import Docker from './index';
import error, { PlatformNotCompatible } from '../../utils/errors/coreError';

/**
 * Remove a container with id.
 * @example
 * await friday.docker.remove('71501a8ab0f8');
 */
export default async function remove(this: Docker, id: string) {
  try {
    if (!this.dockerode) {
      throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
    }
    const container = await this.getContainer(id);

    // If container is running, stop it before removing
    const containerInfos = await container.inspect();
    if (containerInfos.State.Status === 'running') {
      await container.stop();
    }

    return await container.remove();
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
