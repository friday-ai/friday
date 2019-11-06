import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

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
      throw new NotFoundError({name: 'Update a Stallite', message: 'Satellite not found', metadata: satellite.id});
    }
    satelliteToUpdate.update(satellite);
    let satelliteToReturn = <SatelliteType>satelliteToUpdate.get({ plain: true });
    return satelliteToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: satellite});
  }
}
