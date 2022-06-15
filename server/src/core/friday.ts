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
import { FridayMode } from '../utils/constants';
import { generateJwtSecret } from '../utils/jwt';
import jobs from '../config/jobs';
import error from '../utils/errors/coreError';
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
  public action = new Action();
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
  public device = new Device(this.event, this.state);
  public plugin = new Plugin(this.masterId, this.docker, this.state);
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
