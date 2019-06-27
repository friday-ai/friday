import { StateOwner } from '../../utils/constants';
import UserType from '../user/user.interface';
import RoomType from '../room/room.interface';
import HouseType from '../house/house.interface';
import PluginType from '../plugin/plugin.interface';
import DeviceType from '../device/device.interface';

export default interface SatelliteType {
  id: string;
  owner?: string;
  ownerType?: StateOwner;
  user?: UserType;
  room?: RoomType;
  house?: HouseType;
  plugin?: PluginType;
  satellite?: SatelliteType;
  device?: DeviceType;
}
