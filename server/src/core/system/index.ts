import getVersion from './system.getVersion';
import init from './system.init';
import saveVersion from './system.saveVersion';
import start from './system.start';
import shutdown from './system.shutdown';
import VariableClass from '../variable';
import HouseClass from '../house';
import RoomClass from '../room';
import SatelliteClass from '../satellite';
import UserClass from '../user';
import StateClass from '../state';
import SchedulerClass from '../../utils/scheduler';

/**
 * System
 */
export default class System {
  getVersion = getVersion;
  init = init;
  saveVersion = saveVersion;
  start = start;
  shutdown = shutdown;

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
}
