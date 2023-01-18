import { PlatformNotCompatible } from '../utils/error';
import Docker from '../index';
import logger from '../utils/log';

/**
 * Pull an new container image.
 * @param {string} repoTag - Container image name (optionally with tag).
 * @param {Function} onProgress - Callback on progress event. (Optional)
 * @example
 * await docker.pull('my-image');
 */
export default async function pull(this: Docker, repoTag: string, onProgress = logger.info): Promise<void> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'App not running on Docker' });
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
    onProgress
  );
}
