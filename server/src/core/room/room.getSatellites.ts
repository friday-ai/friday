import Room from '../../models/room';
import Log from '../../utils/log';
import Satellite from '../../models/satellite';
import getById from './room.getById';

const logger = new Log();

export default async function getSatellites(room: Room): Promise<Satellite[]> {
  try {
    const thisRoom = await getById(room.id);
    return thisRoom.satellites;
  } catch (e) {
    throw logger.error(e);
  }
}
