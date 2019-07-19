import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Update a satellite.
 * @param {SatelliteType} satellite - A satellite object.
 * @returns {Promise<SatelliteType>} Resolve with updated satellite.
 * @example
 * ````
 * friday.satellite.update({
 *   id: '31f61b90-27cc-4bf6-9855-4cc59526157b'
 *   name: 'satellite update'
 * });
 * ````
 */
export default async function update(satellite: SatelliteType): Promise<SatelliteType> {
  try {
    const satelliteToUpdate = await Satellite.findByPk(satellite.id);

    if (satelliteToUpdate === null) {
      throw logger.error('Satellite not found');
    }
    satelliteToUpdate.update(satellite);
    let satelliteToReturn = <SatelliteType>satelliteToUpdate.get({ plain: true });
    return satelliteToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
