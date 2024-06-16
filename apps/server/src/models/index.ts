import type { KVArr } from "@friday-ai/shared";
import type { ModelCtor } from "sequelize-typescript";

import Action from "./action";
import Device from "./device";
import DeviceCapability from "./device_capability";
import DeviceCapabilitySettings from "./device_capability_settings";
import DeviceCapabilityState from "./device_capability_state";
import House from "./house";
import Plugin from "./plugin";
import Room from "./room";
import Satellite from "./satellite";
import Scene from "./scene";
import Script from "./script";
import Session from "./session";
import State from "./state";
import Trigger from "./trigger";
import User from "./user";
import Variable from "./variable";

const modelsArr = [
  Action,
  DeviceCapabilitySettings,
  DeviceCapabilityState,
  DeviceCapability,
  Device,
  House,
  Plugin,
  Room,
  Satellite,
  Scene,
  Script,
  Session,
  State,
  Trigger,
  User,
  Variable,
];

const modelsObj: KVArr<ModelCtor> = {
  action: Action,
  device_capability: DeviceCapability,
  device_capability_settings: DeviceCapabilitySettings,
  device_capability_state: DeviceCapabilityState,
  device: Device,
  house: House,
  plugin: Plugin,
  room: Room,
  satellite: Satellite,
  scene: Scene,
  script: Script,
  session: Session,
  state: State,
  trigger: Trigger,
  user: User,
  variable: Variable,
};

export { modelsArr, modelsObj };
