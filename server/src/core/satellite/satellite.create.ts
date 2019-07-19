import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Create a satellite.
 * @param {SatelliteType} satellite - A satellite object.
 * @returns {Promise<SatelliteType>} Resolve with created satellite.
 * @example
 * ````
 * friday.satellite.create({
 *    id: '70d24472-24bb-4419-89da-dfd7dd30aa5d',
 *    name: 'Satellite sample',
 *    roomId: '202e512f-a02a-4fc3-a96d-cd639dd03556'
 * });
 * ````
 */
export default async function create(satellite: SatelliteType): Promise<SatelliteType> {
  try {
    const createdSatellite = await Satellite.create(satellite);
    let satelliteToReturn = <SatelliteType>createdSatellite.get({ plain: true });
    return satelliteToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
