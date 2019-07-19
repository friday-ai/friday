import VariableType from '../variable/variable.interface';
import RoomType from '../room/room.interface';
import StateType from '../state/state.interface';
import PluginType from '../plugin/plugin.interface';

/**
 * Satellite interface.
 */
export default interface SatelliteType {
  id: string;
  name?: string;
  roomId?: string;
  room?: RoomType;
  plugins?: Array<PluginType[]>;
  variables?: Array<VariableType[]>;
  state?: StateType;
}
