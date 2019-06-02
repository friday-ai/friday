import Room from '../../models/room';
import Log from '../../utils/log';
import Satellite from '../../models/satellite';
import getRoom from './room.getRoom';

const logger = new Log();

export default async function getSatellites(room: Room): Promise<Satellite[]> {
    try {
        const thisRoom = await getRoom(room.id);
        return thisRoom.satellite;
    } catch (e) {
        throw logger.error(e);
    }
}
