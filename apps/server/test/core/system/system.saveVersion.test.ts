import Docker from "@friday-ai/docker";
import { expect } from "chai";
import * as database from "../../../src/config/database";
import jobs from "../../../src/config/jobs";
import House from "../../../src/core/house/house";
import Plugin from "../../../src/core/plugin/plugin";
import Room from "../../../src/core/room/room";
import Satellite from "../../../src/core/satellite/satellite";
import State from "../../../src/core/state/state";
import System from "../../../src/core/system/system";
import User from "../../../src/core/user/user";
import Variable from "../../../src/core/variable/variable";
import Event from "../../../src/utils/event";
import Scheduler from "../../../src/utils/scheduler";

describe("System.saveVersion", () => {
  const event = Event;
  const variable = new Variable();
  const state = new State(event, variable);
  const user = new User(state);
  const room = new Room(state);
  const docker = new Docker();
  const plugin = new Plugin(event, docker, state);
  const satellite = new Satellite(state, plugin);
  const house = new House(state);
  const scheduler = new Scheduler(event, jobs);
  const system = new System(variable, house, room, satellite, user, state, scheduler, database);

  it("should save friday version", async () => {
    await system.saveVersion("52.20.45");
    const version = await system.getVersion();
    expect(version[1]).to.equal("52.20.45");
  });
});
