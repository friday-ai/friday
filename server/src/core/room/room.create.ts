import Room from '../../models/room';
import RoomType from './room.interface';
import error from '../../utils/errors/coreError';
import setItemState from '../../utils/itemState';
import { AvailableState, StateOwner } from '../../utils/constants';

/**
 * Create a room.
 * @param {RoomType} room - A room object.
 * @returns {Promise<RoomType>} Resolve with created room.
 * @example
 * ````
 * friday.room.create({
 *    id: 'c1124b18-6246-4e4b-8f8b-37ec0f2af4bf',
 *    name: 'A room sample',
 *    houseId: '0f1ff0ef-3969-4de4-84bc-84fd7ab18194'
 * });
 * ````
 */
export default async function create(room: RoomType): Promise<RoomType> {
  try {
    const createdRoom = await Room.create({ ...room });
    const roomToReturn = <RoomType>createdRoom.get({ plain: true });
    setItemState(
      roomToReturn.id!,
      roomToReturn.id!,
      StateOwner.ROOM,
      AvailableState.ROOM_EMPTY,
    );
    return roomToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: room,
    });
  }
}
