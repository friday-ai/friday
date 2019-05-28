import Room from '../../models/room';
import Log from '../../utils/log';
import Satellite from '../../models/satellite';

const logger = new Log();

export default async function getSatellites(room: Room): Promise<Satellite[]> {
    try {
        return room.satellite;
    } catch (e) {
        throw logger.error(e);
    }
}
