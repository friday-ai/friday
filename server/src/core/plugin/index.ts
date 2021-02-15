import create from './plugin.create';
import update from './plugin.update';
import destroy from './plugin.destroy';
import getAll from './plugin.getAll';
import getById from './plugin.getById';
import heartbeat from './plugin.heartbeat';
import install from './plugin.install';
import stop from './plugin.stop';
import DockerClass from '../docker/index';
import StateClass from '../state/index';

/**
 * Plugin
 */
export default class Plugin {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;
  heartbeat = heartbeat;
  install = install;
  stop = stop;

  public masterId: string;
  public docker: DockerClass;
  public state: StateClass;

  constructor(masterId: string, docker: DockerClass, state: StateClass) {
    this.masterId = masterId;
    this.docker = docker;
    this.state = state;
  }
}
