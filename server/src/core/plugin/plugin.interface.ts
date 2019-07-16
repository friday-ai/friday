import SatelliteType from '../satellite/satellite.interface';
import VariableType from '../variable/variable.interface';
import StateType from '../state/state.interface';
import DeviceType from '../device/device.interface';

/**
 * @name PluginType
 * @description Plugin interface.
 * @param {String} id - Id of plugin.
 * @param {String} name - Name of plugin.
 * @param {String} version - Version of plugin.
 * @param {String} url - Url of plugin.
 * @param {Boolean} enabled - Flag for started/stopped plugin.
 * @param {String} satelliteId - Id of the owner satellite.
 */
export default interface PluginType {
  id: string;
  name?: string;
  version?: string;
  url?: string;
  enabled?: boolean;
  satelliteId?: string;
  satellite?: SatelliteType;
  state?: StateType;
  devices?: Array<DeviceType[]>;
  variables?: Array<VariableType[]>;
}
