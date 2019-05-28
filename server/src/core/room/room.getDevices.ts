import Room from '../../models/room';
import Log from '../../utils/log';
import Device from '../../models/device';

const logger = new Log();

export default async function getDevices(room: Room): Promise<Device[]> {
    try {
        return room.device;
    } catch (e) {
        throw logger.error(e);
    }
}
