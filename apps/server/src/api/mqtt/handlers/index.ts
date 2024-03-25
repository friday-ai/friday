import Friday from '../../../core/friday';
import { KVArr } from '../../../utils/interfaces';

import DeviceDestroy from './device/destroy';
import DeviceRegister from './device/register';
import PluginsDiscoverme from './plugin/discoverme';
import PluginsHeartbeat from './plugin/heartbeat';
import PluginsInit from './plugin/init';
import SatelliteDiscoverme from './satellite/discoverme';
import SatelliteHeartbeat from './satellite/heartbeat';
import SatelliteInit from './satellite/init';
import StateSet from './state/set';

export type handlerFnType = (friday: Friday, payload: never) => Promise<void>;

const handlers: KVArr<handlerFnType> = {
  'device/destroy': DeviceDestroy,
  'device/register': DeviceRegister,
  'plugin/discorverme': PluginsDiscoverme,
  'plugin/heartbeat': PluginsHeartbeat,
  'plugin/init': PluginsInit,
  'satellite/discorverme': SatelliteDiscoverme,
  'satellite/heartbeat': SatelliteHeartbeat,
  'satellite/init': SatelliteInit,
  'state/set': StateSet,
};

export default handlers;
