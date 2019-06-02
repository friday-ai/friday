import Room from '../../models/room';
import Log from '../../utils/log';
const logger = new Log();

export default async function get(): Promise<Room[]> {
  try {
    const rooms = await Room.findAll();
    return rooms;
  } catch (e) {
    throw logger.error(e);
  }
}
