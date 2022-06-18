import VariableClass from '../variable/variable';
import HouseClass from '../house/house';
import RoomClass from '../room/room';
import SatelliteClass from '../satellite/satellite';
import UserClass from '../user/user';
import StateClass from '../state/state';
import SchedulerClass from '../../utils/scheduler';
import { Catch } from '../../utils/decorators/error';

import getVersion from './system.getVersion';
import init from './system.init';
import saveVersion from './system.saveVersion';
import start from './system.start';
import shutdown from './system.shutdown';

/**
 * System
 */
export default class System {
  public variable: VariableClass;
  public house: HouseClass;
  public room: RoomClass;
  public satellite: SatelliteClass;
  public user: UserClass;
  public state: StateClass;
  public scheduler: SchedulerClass;
  public database: any;
  public env = process.env.NODE_ENV || 'production';

  constructor(variable: VariableClass, house: HouseClass, room: RoomClass, satellite: SatelliteClass,
    user: UserClass, state: StateClass, scheduler: SchedulerClass, database: any) {
    this.variable = variable;
    this.house = house;
    this.room = room;
    this.satellite = satellite;
    this.user = user;
    this.state = state;
    this.scheduler = scheduler;
    this.database = database;
  }

  @Catch()
  async getVersion() {
    return getVersion.call(this);
  }

  @Catch()
  async init() {
    return init.call(this);
  }

  @Catch()
  async saveVersion(version: string) {
    return saveVersion.call(this, version);
  }

  @Catch()
  async start() {
    return start.call(this);
  }

  @Catch()
  async shutdown() {
    return shutdown.call(this);
  }
}
