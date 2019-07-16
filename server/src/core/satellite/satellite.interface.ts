import VariableType from '../variable/variable.interface';
import RoomType from '../room/room.interface';
import StateType from '../state/state.interface';
import PluginType from '../plugin/plugin.interface';

/**
 * @name SatelliteType
 * @description Satellite interface.
 * @param {String} id - Id of satellite.
 * @param {String} name - Name of satellite.
 * @param {String} roomId - Id of room.
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
