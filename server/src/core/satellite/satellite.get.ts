import Satellite from '../../models/satellite';
import Log from '../../utils/log';
const logger = new Log();

export default async function get(satellite: Satellite): Promise<Satellite[]> {
    try {
        const satellite = await Satellite.findAll();
        return satellite;
    } catch (e) {
        throw logger.error(e);
    }
}
