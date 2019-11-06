import House from '../../models/house';
import { GetOptions } from '../../utils/interfaces';
import HouseType from './house.interface';
import error from '../../utils/errors/coreError';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

/**
 * Get all houses.
 * @param {Getoptions} options - Options of the query.
 * @returns {Promise<HouseType[]>} Resolve with house array.
 * @example
 * ````
 * friday.house.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<HouseType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let houses;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      houses = await House.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      houses = await House.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const housesPlain = <HouseType[]>houses.map((house) => {
      const housePlain = house.get({ plain: true });
      return housePlain;
    });

    return housesPlain;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: options});
  }
}
