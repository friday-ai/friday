import Satellite from '../../models/satellite';
import Log from '../../utils/log';
const logger = new Log();

export default async function getSatellite(satellite: Satellite): Promise<Satellite> {
    try {
        return await Satellite.findByPk(satellite.id);
    } catch (e) {
        throw logger.error(e);
    }
}