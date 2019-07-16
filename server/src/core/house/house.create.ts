import House from '../../models/house';
import HouseType from './house.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name house.create
 * @description Create an house.
 * @param {HouseType} house - An house object.
 * @returns {Promise<HouseType>} Resolve with created house.
 * @example
 * friday.house.create({
 *    id: '7774f404-1947-4908-b2a4-5ab5df808693',
 *    name: 'Sample House',
 *    latitude: '34.0012295',
 *    longitude: '-118.8067245'
 * });
 */
export default async function create(house: HouseType): Promise<HouseType> {
  try {
    const createdHouse = await House.create(house);
    let houseToReturn = <HouseType>createdHouse.get({ plain: true });
    return houseToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
