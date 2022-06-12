import House from '../../models/house';
import error from '../../utils/errors/coreError';

/**
 * Get count of houses.
 * @returns {Promise<number>} Resolve with number of houses.
 * @example
 * ````
 * friday.house.getCount();
 * ````
 */
export default async function getCount(): Promise<number> {
  try {
    const houses = await House.findAndCountAll({});
    return houses.count;
  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e });
  }
}
