import { PlatformNotCompatible } from '../../utils/decorators/error';
import Docker from './docker';
import logger from '../../utils/log';

/**
 * Pull an new container image.
 * @param {string} repoTag - Container image name (optionally with tag).
 * @param {Function} onProgress - Callback on progress event. (Optional)
 * @example
 * await friday.docker.pull('my-image');
 */
export default async function pull(this: Docker, repoTag: string, onProgress = logger.info): Promise<any> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
  }
  const stream = await this.dockerode.pull(repoTag);

  return this.dockerode.modem.followProgress(
    stream,
    (finishErr: any, output: any) => {
      if (finishErr) {
        throw finishErr;
      }
      return output;
    },
    onProgress,
  );
}
