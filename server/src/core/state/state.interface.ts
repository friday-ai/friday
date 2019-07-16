import { StateOwner, AvailableState } from '../../utils/constants';
import UserType from '../user/user.interface';
import RoomType from '../room/room.interface';
import HouseType from '../house/house.interface';
import PluginType from '../plugin/plugin.interface';
import DeviceType from '../device/device.interface';
import SatelliteType from '../satellite/satellite.interface';

/**
 * @name StateType
 * @description State interface.
 * @param {String} id - Id of state.
 * @param {String} owner - Owner of state.
 * @param {StateOwner} ownerType - A owner type of state.
 * @param {AvailableState} value - A state value.
 */
export default interface StateType {
  id: string;
  owner: string;
  ownerType: StateOwner;
  value: AvailableState;
  user?: UserType;
  room?: RoomType;
  house?: HouseType;
  plugin?: PluginType;
  satellite?: SatelliteType;
  device?: DeviceType;
}
