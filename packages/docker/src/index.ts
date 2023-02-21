import Dockerode, { ContainerCreateOptions, ExecCreateOptions } from 'dockerode';
import logger from '@friday-ai/logger';
import { Catch } from './utils/error';

import isDocker from './core/docker.isDocker';
import getAllContainers from './core/docker.getAllContainers';
import getContainer from './core/docker.getContainer';
import start from './core/docker.start';
import stop from './core/docker.stop';
import restart from './core/docker.restart';
import remove from './core/docker.remove';
import pull from './core/docker.pull';
import createContainer from './core/docker.createContainer';
import exec from './core/docker.exec';

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
