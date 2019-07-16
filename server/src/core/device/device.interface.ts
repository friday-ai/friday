
import { AvailableTypeOfDevice, AvailableSubTypeOfDevice } from '../../utils/constants';
import RoomType from '../room/room.interface';
import StateType from '../state/state.interface';
import PluginType from '../plugin/plugin.interface';

/**
 * @name DeviceType
 * @description Device interface.
 * @param {String} id - Id of device.
 * @param {String} name - Name of device.
 * @param {AvailableTypeOfDevice} type - Type of device.
 * @param {AvailableSubTypeOfDevice} subType - Sub type of device.
 * @param {Any} variable - Variables of device. (Must be a JSON)
 * @param {String} unit - Unite of device.
 * @param {String} value - Value of device.
 * @param {String} roomId - Identifier of the room in which the device is located
 * @param {String} pluginId - Id of the owner plugin.
 */
export default interface DeviceType {
  id: string;
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
