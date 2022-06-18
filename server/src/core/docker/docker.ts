import Dockerode, { ContainerCreateOptions, ExecCreateOptions } from 'dockerode';
import { Catch } from '../../utils/decorators/error';
import logger from '../../utils/log';

import isDocker from './docker.isDocker';
import getAllContainers from './docker.getAllContainers';
import getContainer from './docker.getContainer';
import start from './docker.start';
import stop from './docker.stop';
import restart from './docker.restart';
import remove from './docker.remove';
import pull from './docker.pull';
import createContainer from './docker.createContainer';
import exec from './docker.exec';

export default class Docker {
  public dockerode = isDocker() ? new Dockerode() : null;

  @Catch()
  async createContainer(options: ContainerCreateOptions) {
    return createContainer.call(this, options);
  }

  @Catch()
  async remove(id: string) {
    return remove.call(this, id);
  }

  @Catch()
  async start(id: string) {
    return start.call(this, id);
  }

  @Catch()
  async stop(id: string) {
    return stop.call(this, id);
  }

  @Catch()
  async restart(id: string) {
    return restart.call(this, id);
  }

  @Catch()
  async pull(repoTag: string, onProgress = logger.info) {
    return pull.call(this, repoTag, onProgress);
  }

  @Catch()
  async exec(id: string, options: ExecCreateOptions) {
    return exec.call(this, id, options);
  }

  @Catch()
  async getContainer(id: string) {
    return getContainer.call(this, id);
  }

  @Catch()
  async getAllContainers() {
    return getAllContainers.call(this);
  }

  async isDocker() {
    return isDocker.call(this);
  }
}
