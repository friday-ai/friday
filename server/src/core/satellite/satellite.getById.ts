import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

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
      throw new NotFoundError({ name: 'Get Satellite by Id', message: 'Satellite not found', metadata: id });
    }

    const satelliteToReturn = <SatelliteType>satellite.get({ plain: true });

    return satelliteToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
