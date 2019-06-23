import SatelliteType from '../satellite/satellite.interface';
import VariableType from '../variable/variable.interface';
import StateType from '../state/state.interface';

export default interface PluginType {
  id: string;
  name?: string;
  version?: string;
  satelliteId?: string;
  satellite?: SatelliteType;
  state?: StateType;
  variables?: Array<VariableType[]>;
}
