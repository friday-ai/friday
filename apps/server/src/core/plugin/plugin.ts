import DockerClass from '@friday-ai/docker';
import { PluginAttributes, PluginCreationAttributes, PluginCreationKeys, PluginInstallAttributes } from '@friday-ai/shared';

import PluginModel from '../../models/plugin';
import BaseModel from '../../utils/database/model.base';
import { Catch } from '../../utils/decorators/error';
import EventClass from '../../utils/event';
import StateClass from '../state/state';

import uninstall from './plugin.uninstall';
import heartbeat from './plugin.heartbeat';
import install from './plugin.install';
import stop from './plugin.stop';

/**
 * Plugin
 */
export default class Plugin extends BaseModel<PluginModel, PluginAttributes, PluginCreationAttributes> {
  public event: typeof EventClass;
  public docker: DockerClass;
  public state: StateClass;

  constructor(event: typeof EventClass, docker: DockerClass, state: StateClass) {
    super(PluginModel, PluginCreationKeys);
    this.event = event;
    this.docker = docker;
    this.state = state;
  }

  @Catch()
  async uninstall(id: string): Promise<void> {
    return uninstall.call(this, id);
  }

  @Catch()
  async install(options: PluginInstallAttributes): Promise<PluginAttributes> {
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
