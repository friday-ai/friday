import House from '../../models/house';
import HouseType from './house.interface';
import error from '../../utils/errors/coreError';
import setItemState from '../../utils/itemState';
import { AvailableState, StateOwner } from '../../utils/constants';

/**
 * Create an house.
 * @param {HouseType} house - An house object.
 * @returns {Promise<HouseType>} Resolve with created house.
 * @example
 * ````
 * friday.house.create({
 *    id: '7774f404-1947-4908-b2a4-5ab5df808693',
 *    name: 'Sample House',
 *    latitude: '34.0012295',
 *    longitude: '-118.8067245'
 * });
 * ````
 */
export default async function create(house: HouseType): Promise<HouseType> {
  try {
    const createdHouse = await House.create(house);
    const houseToReturn = <HouseType>createdHouse.get({ plain: true });
    setItemState(
      houseToReturn.id!,
      houseToReturn.id!,
      StateOwner.HOUSE,
      AvailableState.HOUSE_EMPTY,
    );
    return houseToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: house,
    });
  }
}
