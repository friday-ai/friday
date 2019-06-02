import Room from '../../models/room';
import Log from '../../utils/log';
import Device from '../../models/device';
import getById from './room.getById';

const logger = new Log();

export default async function getDevices(room: Room): Promise<Device[]> {
  try {
    const thisRoom = await getById(room.id);
    return thisRoom.device;
  } catch (e) {
    throw logger.error(e);
  }
}
