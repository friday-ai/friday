import Room from '../../models/room';
import Log from '../../utils/log';
import Device from '../../models/device';
import getRoom from './room.getRoom';

const logger = new Log();

export default async function getDevices(room: Room): Promise<Device[]> {
    try {
        const thisRoom = await getRoom(room.id);
        return thisRoom.device;
    } catch (e) {
        throw logger.error(e);
    }
}
