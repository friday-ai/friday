import SatelliteType from '../satellite/satellite.interface';
import VariableType from '../variable/variable.interface';
import StateType from '../state/state.interface';
import DeviceType from '../device/device.interface';

/**
 * Plugin interface.
 */
export default interface PluginType {
  id?: string;
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
