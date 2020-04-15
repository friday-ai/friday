import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import { GetOptions } from '../../utils/interfaces';
import error from '../../utils/errors/coreError';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
};

/**
 * Get all satellites.
 * @param {Getoptions} options - Options of the query.
 * @returns {Promise<SatelliteType[]>} Resolve with satellite array.
 * @example
 * ````
 * friday.satellite.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<SatelliteType[]> {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let satellites;

    if (mergedOptions.scope !== '' && mergedOptions.scope !== null && mergedOptions.scope !== undefined) {
      satellites = await Satellite.scope(mergedOptions.scope).findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    } else {
      satellites = await Satellite.findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    }

    const satellitesPlain = <SatelliteType[]>satellites.map((satellite) => {
      const satellitePlain = satellite.get({ plain: true });
      return satellitePlain;
    });

    return satellitesPlain;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
