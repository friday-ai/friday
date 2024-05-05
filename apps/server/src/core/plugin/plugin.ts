import type DockerClass from "@friday-ai/docker";
import type { PluginAttributes, PluginCreationAttributes, PluginInstallAttributes } from "@friday-ai/shared";
import { PluginCreationKeys } from "@friday-ai/shared";

import PluginModel from "../../models/plugin";
import BaseModel from "../../utils/database/model.base";
import { Catch } from "../../utils/decorators/error";
import type EventClass from "../../utils/event";
import type StateClass from "../state/state";

import checkState from "./plugin.checkState";
import heartbeat from "./plugin.heartbeat";
import install from "./plugin.install";
import restart from "./plugin.restart";
import stop from "./plugin.stop";
import uninstall from "./plugin.uninstall";

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

  @Catch()
  async restart(id: string) {
    return restart.call(this, id);
  }

  @Catch()
  async checkState(id: string) {
    return checkState.call(this, id);
  }
}
