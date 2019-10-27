import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import { GetOptions } from '../../utils/constants';
import error from '../../utils/error';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
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
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let satellites;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      satellites = await Satellite.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      satellites = await Satellite.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const satellitesPlain = <SatelliteType[]>satellites.map((satellite) => {
      const satellitePlain = satellite.get({ plain: true });
      return satellitePlain;
    });

    return satellitesPlain;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: options});
  }
}
