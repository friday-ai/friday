import SatelliteType from '../satellite/satellite.interface';
import HouseType from '../house/house.interface';
import StateType from '../state/state.interface';

export default interface RoomType {
  id: string;
  name?: string;
  houseId?: string;
  house?: HouseType;
  devices?: string;
  state?: StateType;
  satellites?: Array<SatelliteType[]>;
}
