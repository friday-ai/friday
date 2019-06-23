import Room from '../../models/room';
import RoomType from './room.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getById(id: string, scope?: string): Promise<RoomType> {
  try {

    let room;

    if (scope !== '' && scope !== null && scope !== undefined) {
      room = await Room.scope(scope).findByPk(id);
    } else {
      room = await Room.findByPk(id);
    }

    if (room === null) {
      throw logger.error('Room not found');
    }

    let roomToReturn = <RoomType>room.get({ plain: true });

    return roomToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
