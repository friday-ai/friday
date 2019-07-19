import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Get a satellite by id.
 * @param {String} id - Id of satellite.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<SatelliteType>} Resolve with satellite.
 * @example
 * ````
 * friday.satellite.getById('d30cad70-503a-43ed-8913-c80a80c5ba6a', 'full');
 * ````
 */
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
