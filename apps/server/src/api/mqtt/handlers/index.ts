import type { KVArr } from "@friday-ai/shared";
import type Friday from "../../../core/friday";

import CapabilityState from "./capability/state";
import DeviceDestroy from "./device/destroy";
import DeviceRegister from "./device/register";
import PluginsDiscoverme from "./plugin/discoverme";
import PluginsHeartbeat from "./plugin/heartbeat";
import PluginsInit from "./plugin/init";
import SatelliteDiscoverme from "./satellite/discoverme";
import SatelliteHeartbeat from "./satellite/heartbeat";
import SatelliteInit from "./satellite/init";

export type handlerFnType = (friday: Friday, payload: never) => Promise<void>;

const handlers: KVArr<handlerFnType> = {
  "capability/state": CapabilityState,
  "device/destroy": DeviceDestroy,
  "device/register": DeviceRegister,
  "plugin/discorverme": PluginsDiscoverme,
  "plugin/heartbeat": PluginsHeartbeat,
  "plugin/init": PluginsInit,
  "satellite/discorverme": SatelliteDiscoverme,
  "satellite/heartbeat": SatelliteHeartbeat,
  "satellite/init": SatelliteInit,
};

export default handlers;
