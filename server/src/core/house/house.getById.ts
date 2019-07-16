import House from '../../models/house';
import HouseType from './house.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name house.getById
 * @description Get a house by id.
 * @param {String} id - Id of house.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<HouseType>} Resolve with house.
 * @example
 * friday.device.getById('6be1d66d-da22-47c2-b7d0-54b51429db62', 'full');
 */
export default async function getById(id: string, scope?: string): Promise<HouseType> {
  try {

    let house;

    if (scope !== '' && scope !== null && scope !== undefined) {
      house = await House.scope(scope).findByPk(id);
    } else {
      house = await House.findByPk(id);
    }

    if (house === null) {
      throw logger.error('House not found');
    }

    let houseToReturn = <HouseType>house.get({ plain: true });

    return houseToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
