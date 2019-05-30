import Satellite from '../../models/satellite';
import Log from '../../utils/log';
import Room from '../../models/room';
import getSatellite from './satellite.getSatellites';

const logger = new Log();

export default async function getRoom(satellite: Satellite): Promise<Room> {
    try {
        const thisSatellite = await getSatellite(satellite);
        return thisSatellite.room;
    } catch (e) {
        throw logger.error(e);
    }
}
