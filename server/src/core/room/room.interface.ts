import SatelliteType from '../satellite/satellite.interface';
import HouseType from '../house/house.interface';
import StateType from '../state/state.interface';
import Devices from '../device/device.interface';

/**
 * Room interface.
 */
export default interface RoomType {
  id: string;
  name?: string;
  houseId?: string;
  house?: HouseType;
  devices?: Array<Devices[]>;
  state?: StateType;
  satellites?: Array<SatelliteType[]>;
}
