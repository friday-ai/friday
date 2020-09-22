import RoomType from '../room/room.interface';
import StateType from '../state/state.interface';

/**
 * House interface.
 */
export default interface HouseType {
  id?: string;
  name?: string;
  latitude?: string;
  longitude?: string;
  rooms?: Array<RoomType[]>;
  state?: StateType;
}
