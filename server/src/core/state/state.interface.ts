import { StateOwner, AvailableState } from '../../utils/constants';
import UserType from '../user/user.interface';
import RoomType from '../room/room.interface';
import HouseType from '../house/house.interface';
import PluginType from '../plugin/plugin.interface';
import DeviceType from '../device/device.interface';
import SatelliteType from '../satellite/satellite.interface';

/**
 * State interface.
 */
export default interface StateType {
  id?: string;
  owner: string;
  ownerType: StateOwner;
  value: AvailableState;
  last?: boolean;
  user?: UserType;
  room?: RoomType;
  house?: HouseType;
  plugin?: PluginType;
  satellite?: SatelliteType;
  device?: DeviceType;
}
