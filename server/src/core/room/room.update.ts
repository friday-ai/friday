import Room from '../../models/room';
import RoomType from './room.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name room.update
 * @description Update a room.
 * @param {RoomType} room - A room object.
 * @returns {Promise<RoomType>} Resolve with updated room.
 * @example
 * friday.room.update({
 *   id: '31f61b90-27cc-4bf6-9855-4cc59526157b'
 *   name: 'room update'
 * });
 */
export default async function update(room: RoomType): Promise<RoomType> {
  try {

    const roomToUpdate = await Room.findByPk(room.id);

    if (roomToUpdate === null) {
      throw logger.error('Room not found');
    }
    roomToUpdate.update(room);
    let roomToReturn = <RoomType>roomToUpdate.get({ plain: true });
    return roomToReturn;

  } catch (e) {
    throw logger.error(e);
  }
}
