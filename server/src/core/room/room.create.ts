import Room from '../../models/room';
import RoomType from './room.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(room: RoomType): Promise<RoomType> {
  try {
    const createdRoom = await Room.create(room);
    let roomToReturn = <RoomType>createdRoom.get({ plain: true });
    return roomToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
