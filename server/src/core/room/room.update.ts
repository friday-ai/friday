import Room from '../../models/room';
import RoomType from './room.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Update a room.
 * @param {String} id - Id of room
 * @param {RoomType} room - A room object.
 * @returns {Promise<RoomType>} Resolve with updated room.
 * @example
 * ````
 * friday.room.update(
 * '31f61b90-27cc-4bf6-9855-4cc59526157b',
 * {
 *   id: '31f61b90-27cc-4bf6-9855-4cc59526157b'
 *   name: 'room update'
 * });
 * ````
 */
export default async function update(id: string, room: RoomType): Promise<RoomType> {
  try {
    const roomToUpdate = await Room.findByPk(id);

    if (roomToUpdate === null) {
      throw new NotFoundError({ name: 'Update an Room', message: 'Room not found', metadata: room.id });
    }
    await roomToUpdate.update(room);
    const roomToReturn = <RoomType>roomToUpdate.get({ plain: true });
    return roomToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: room,
    });
  }
}
