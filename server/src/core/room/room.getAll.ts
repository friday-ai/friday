import Room from '../../models/room';
import RoomType from './room.interface';
import { GetOptions } from '../../utils/constants';
import Log from '../../utils/log';

const logger = new Log();
const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

/**
 * Get all rooms.
 * @param {Getoptions} options - Options of the query.
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
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let rooms;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      rooms = await Room.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      rooms = await Room.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const roomsPlain = <RoomType[]>rooms.map((room) => {
      const roomPlain = room.get({ plain: true });
      return roomPlain;
    });

    return roomsPlain;
  } catch (e) {
    throw logger.error(e);
  }
}
