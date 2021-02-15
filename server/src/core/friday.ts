import * as database from '../config/database';
import Action from './action';
import Device from './device';
import House from './house';
import Docker from './docker';
import Plugin from './plugin';
import Room from './room';
import Satellite from './satellite';
import Scene from './scene';
import Script from './script';
import Session from './session';
import State from './state';
import System from './system';
import Trigger from './trigger';
import User from './user';
import Variable from './variable';

import Event from '../utils/event';
import Scheduler from '../utils/scheduler';
import * as Constants from '../utils/constants';
import { generateJwtSecret } from '../utils/jwt';
import jobs from '../config/jobs';
import error from '../utils/errors/coreError';

/**
 * Friday
 * @returns friday object
 */
export default class Friday {
  readonly secretJwt: string = generateJwtSecret();
  public masterId: string = '';

  public event = new Event();
  public scheduler = new Scheduler(this.event, jobs);
  public action = new Action();
  public device = new Device();
  public house = new House();
  public docker = new Docker();
  public room = new Room();
  public satellite = new Satellite();
  public scene = new Scene();
  public script = new Script();
  public session = new Session(this.secretJwt);
  public trigger = new Trigger();
  public user = new User();
  public variable = new Variable();
  public state = new State(this.event, this.variable);
  public plugin = new Plugin(this.masterId, this.docker, this.state);
  public constants = Constants;

  private system = new System(this.variable, this.house, this.room, this.satellite, this.user, this.scheduler, database);

  /**
   * Starts friday
   */
  async start() {
    try {
      await database.init();
      this.masterId = await this.system.start();
    } catch (e) {
      throw error(e);
    }
  }

  /**
   * Gets version
   */
  async getVersion() {
    const version = await this.system.getVersion();
    // Return only package version
    return version[0];
  }
}
