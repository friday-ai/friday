import logger from "@friday-ai/logger";
import Dockerode from "dockerode";
import { Catch } from "./utils/error";

import createContainer from "./core/docker.createContainer";
import exec from "./core/docker.exec";
import getAllContainers from "./core/docker.getAllContainers";
import getContainer from "./core/docker.getContainer";
import getContainerState from "./core/docker.getContainerState";
import isDocker from "./core/docker.isDocker";
import pull from "./core/docker.pull";
import remove from "./core/docker.remove";
import restart from "./core/docker.restart";
import start from "./core/docker.start";
import stop from "./core/docker.stop";

export default class Docker {
  public dockerode = isDocker() ? new Dockerode() : null;

  @Catch()
  async createContainer(options: Dockerode.ContainerCreateOptions) {
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
  async exec(id: string, options: Dockerode.ExecCreateOptions) {
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

  @Catch()
  async getContainerState(id: string) {
    return getContainerState.call(this, id);
  }

  async isDocker() {
    return isDocker.call(this);
  }
}
