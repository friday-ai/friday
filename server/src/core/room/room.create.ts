import Room from '../../models/room';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(room: Room): Promise<Room> {
  try {
    const createdRoom = await Room.create(room);
    return createdRoom;
  } catch (e) {
    throw logger.error(e);
  }
}
