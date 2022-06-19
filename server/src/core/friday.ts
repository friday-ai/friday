import * as database from '../config/database';
import Action from './action/action';
import Device from './device/device';
import House from './house/house';
import Docker from './docker/docker';
import Plugin from './plugin/plugin';
import Room from './room/room';
import Satellite from './satellite/satellite';
import Scene from './scene/scene';
import Script from './script/script';
import Session from './session/session';
import State from './state/state';
import System from './system/system';
import Trigger from './trigger/trigger';
import User from './user/user';
import Variable from './variable/variable';

import Event from '../utils/event';
import Scheduler from '../utils/scheduler';
import * as Constants from '../config/constants';
import { FridayMode } from '../config/constants';
import { generateJwtSecret } from '../utils/jwt';
import jobs from '../config/jobs';
import error from '../utils/decorators/error';
import logger from '../utils/log';

/**
 * Friday
 * @returns friday object
 */
export default class Friday {
  readonly secretJwt: string = generateJwtSecret();
  public masterId: string = '';

  public event = Event;
  public scheduler = new Scheduler(this.event, jobs);
  public variable = new Variable();
  public docker = new Docker();
  public state = new State(this.event, this.variable);

  public house = new House(this.state);
  public room = new Room(this.state);
  public satellite = new Satellite(this.state);
  public device = new Device(this.event, this.state);
  public user = new User(this.state);
  public plugin = new Plugin(this.masterId, this.docker, this.state);

  public action = new Action();
  public scene = new Scene();
  public script = new Script();
  public session = new Session(this.secretJwt);
  public trigger = new Trigger();
  public constants = Constants;
  public mqttSecret: object = {};
  public mode: FridayMode = FridayMode.NOMINAL;

  private system = new System(this.variable, this.house, this.room,
    this.satellite, this.user, this.state, this.scheduler, database);

  /**
   * Start friday
   */
  async start() {
    try {
      await database.init();
      this.masterId = await this.system.start();

      // If masterId is empty, is because master satellite not initialized
      if (this.masterId === '') {
        this.mode = FridayMode.INIT;
      }
    } catch (e) {
      logger.error(e);
      throw error(e);
    }
  }

  /**
   * Init friday
   */
  async init() {
    if (this.mode === FridayMode.INIT) {
      try {
        this.masterId = await this.system.init();
        this.mode = FridayMode.NOMINAL;
        return true;
      } catch (e) {
        logger.error(e);
        throw error(e);
      }
    } else {
      return false;
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

  /**
   * Stop friday
   */
  async stop() {
    return this.system.shutdown();
  }
}
