import Room from '../../models/room';
import RoomType from './room.interface';
import Log from '../../utils/log';
const logger = new Log();

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
