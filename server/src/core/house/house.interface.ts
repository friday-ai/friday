import RoomType from '../room/room.interface';
import StateType from '../state/state.interface';

/**
 * @name HouseType
 * @description House interface.
 * @param {String} id - Id of house.
 * @param {String} name - Name of house.
 * @param {String} latitude - Latitude of house.
 * @param {String} longitude - Longitude of house.
 */
export default interface HouseType {
  id: string;
  name?: string;
  latitude?: string;
  longitude?: string;
  rooms?: Array<RoomType[]>;
  state?: StateType;
}
