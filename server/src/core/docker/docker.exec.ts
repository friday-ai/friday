import { ExecCreateOptions } from 'dockerode';
import Docker from './docker';
import { PlatformNotCompatible } from '../../utils/decorators/error';

/**
 * Execute a command in a container image.
 * @param {string} id - Container id.
 * @param {ExecCreateOptions} options - Command to execute.
 * @example
 * await friday.docker.exec(id, options);
 */
export default async function exec(this: Docker, id: string, options: ExecCreateOptions): Promise<any> {
  if (!this.dockerode) {
    throw new PlatformNotCompatible({ name: 'Platform not compatible', message: 'Friday not running on Docker' });
  }

  const container = await this.getContainer(id);
  const executable = await container.exec(options);

  const stream = await executable.start({ hijack: true, stdin: true });
  this.dockerode.modem.demuxStream(stream, process.stdout, process.stderr);
  return true;
}
