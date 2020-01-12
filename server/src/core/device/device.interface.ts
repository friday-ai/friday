
import { AvailableTypeOfDevice, AvailableSubTypeOfDevice } from '../../utils/constants';
import RoomType from '../room/room.interface';
import StateType from '../state/state.interface';
import PluginType from '../plugin/plugin.interface';

/**
 * Device interface.
 */
export default interface DeviceType {
  id?: string;
  name?: string;
  type?: AvailableTypeOfDevice;
  subType?: AvailableSubTypeOfDevice;
  variable?: any;
  unit?: string;
  value?: string;
  roomId?: string;
  room?: RoomType;
  pluginId?: string;
  plugin?: PluginType;
  state?: StateType;
}
