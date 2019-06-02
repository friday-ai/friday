import Satellite from '../../models/satellite';
import Log from '../../utils/log';
const logger = new Log();

export default async function getSatellite(id: string): Promise<Satellite> {
  try {
    const satellite = await Satellite.findByPk(id);

    if (satellite === null) {
      throw logger.error('Satellite not found');
    }

    return satellite;
  } catch (e) {
    throw logger.error(e);
  }
}
