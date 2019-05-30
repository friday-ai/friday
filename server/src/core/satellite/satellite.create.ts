import Satellite from '../../models/satellite';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(satellite: Satellite): Promise<Satellite> {
    try {
        const createdSatellite = await Satellite.create(satellite);
        return createdSatellite;
    } catch (e) {
        throw logger.error(e);
    }
}
