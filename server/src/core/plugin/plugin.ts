import DockerClass from '../docker/docker';
import StateClass from '../state/state';
import BaseModel from '../../utils/database/model.base';
import { PluginType } from '../../config/entities';
import PluginModel from '../../models/plugin';
import { Catch } from '../../utils/decorators/error';
import { PluginInstallOptions } from '../../utils/interfaces';

import heartbeat from './plugin.heartbeat';
import install from './plugin.install';
import stop from './plugin.stop';

/**
 * Plugin
 */
export default class Plugin extends BaseModel<PluginModel, PluginType> {
  public docker: DockerClass;
  public state: StateClass;

  constructor(docker: DockerClass, state: StateClass) {
    super(PluginModel);
    this.docker = docker;
    this.state = state;
  }

  @Catch()
  async destroy(id: string): Promise<void> {
    const plugin = await super.getById(id);
    await this.docker.remove(plugin.dockerId!);

    return super.destroy(id);
  }

  @Catch()
  async install(options: PluginInstallOptions): Promise<PluginType> {
    return install.call(this, options);
  }

  @Catch()
  async heartbeat(id: string) {
    return heartbeat(id);
  }

  @Catch()
  async stop(id: string) {
    return stop.call(this, id);
  }
}
