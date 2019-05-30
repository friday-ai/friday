import Satellite from '../../models/satellite';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(satellite: Satellite): Promise<Satellite> {
    try {
        const satelliteToUpdate = await Satellite.findByPk(satellite.id);

        if (satelliteToUpdate === null) {
            throw logger.error('Satellite not found');
        }

        return satelliteToUpdate.update(satellite);
    } catch (e) {
        throw logger.error(e);
    }
}
