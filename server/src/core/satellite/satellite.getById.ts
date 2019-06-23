import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getById(id: string, scope?: string): Promise<SatelliteType> {
  try {

    let satellite;

    if (scope !== '' && scope !== null && scope !== undefined) {
      satellite = await Satellite.scope(scope).findByPk(id);
    } else {
      satellite = await Satellite.findByPk(id);
    }

    if (satellite === null) {
      throw logger.error('Satellite not found');
    }

    let satelliteToReturn = <SatelliteType>satellite.get({ plain: true });

    return satelliteToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
