import Room from '../../models/room';
import RoomType from './room.interface';
import { GetOptions } from '../../utils/interfaces';
import error from '../../utils/errors/coreError';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
};

/**
 * Get all rooms.
 * @param {GetOptions} options - Options of the query.
 * @returns {Promise<RoomType[]>} Resolve with room array.
 * @example
 * ````
 * friday.room.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<RoomType[]> {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let rooms;

    if (mergedOptions.scope !== '' && mergedOptions.scope !== null && mergedOptions.scope !== undefined) {
      rooms = await Room.scope(mergedOptions.scope).findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    } else {
      rooms = await Room.findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    }

    const roomsPlain = <RoomType[]>rooms.map((room) => {
      const roomPlain = room.get({ plain: true });
      return roomPlain;
    });

    return roomsPlain;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
