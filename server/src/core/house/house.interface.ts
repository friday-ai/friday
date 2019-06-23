import RoomType from '../room/room.interface';
import StateType from '../state/state.interface';

export default interface HouseType {
  id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
  rooms?: RoomType[];
  state?: StateType;
}
