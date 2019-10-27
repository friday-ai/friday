import Room from '../../models/room';
import RoomType from './room.interface';
import { default as error, NotFoundError} from '../../utils/error';

/**
 * Get a room by id.
 * @param {String} id - Id of room.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<RoomType>} Resolve with room.
 * @example
 * ````
 * friday.room.getById('4fdc2756-7303-47ca-b91d-6d0805165004', 'full');
 * ````
 */
export default async function getById(id: string, scope?: string): Promise<RoomType> {
  try {

    let room;

    if (scope !== '' && scope !== null && scope !== undefined) {
      room = await Room.scope(scope).findByPk(id);
    } else {
      room = await Room.findByPk(id);
    }

    if (room === null) {
      throw new NotFoundError({name: 'Get Room by Id', message: 'Room not found', metadata: id});
    }

    let roomToReturn = <RoomType>room.get({ plain: true });

    return roomToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
