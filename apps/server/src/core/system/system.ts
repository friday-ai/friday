import { Catch } from "../../utils/decorators/error";
import type SchedulerClass from "../../utils/scheduler";
import type HouseClass from "../house/house";
import type RoomClass from "../room/room";
import type SatelliteClass from "../satellite/satellite";
import type StateClass from "../state/state";
import type UserClass from "../user/user";
import type VariableClass from "../variable/variable";

import getSettings from "./system.getSettings";
import getVersion from "./system.getVersion";
import init from "./system.init";
import saveVersion from "./system.saveVersion";
import shutdown from "./system.shutdown";
import start from "./system.start";

import type * as DBType from "../../config/database";

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
  public database: typeof DBType;
  public env = process.env.NODE_ENV || "production";

  constructor(
    variable: VariableClass,
    house: HouseClass,
    room: RoomClass,
    satellite: SatelliteClass,
    user: UserClass,
    state: StateClass,
    scheduler: SchedulerClass,
    database: typeof DBType,
  ) {
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
  async getSettings() {
    return getSettings.call(this);
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
