import House from '../../models/house';
import HouseType from './house.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Update an house.
 * @param {HouseType} house - An house object.
 * @returns {Promise<HouseType>} Resolve with updated house.
 * @example
 * ````
 * friday.house.update({
 *   id: '40d43cf1-2127-41e9-ac69-9e39636fac20'
 *   name: 'house update'
 * });
 * ````
 */
export default async function update(house: HouseType): Promise<HouseType> {
  try {

    const houseToUpdate = await House.findByPk(house.id);

    if (houseToUpdate === null) {
      throw logger.error('House not found');
    }
    houseToUpdate.update(house);
    let houseToReturn = <HouseType>houseToUpdate.get({ plain: true });
    return houseToReturn;

  } catch (e) {
    throw logger.error(e);
  }
}
