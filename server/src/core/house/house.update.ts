import House from '../../models/house';
import HouseType from './house.interface';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

/**
 * Update an house.
 * @param {String} id - Id of house.
 * @param {HouseType} house - An house object.
 * @returns {Promise<HouseType>} Resolve with updated house.
 * @example
 * ````
 * friday.house.update(
 * '40d43cf1-2127-41e9-ac69-9e39636fac20',
 * {
 *   id: '40d43cf1-2127-41e9-ac69-9e39636fac20'
 *   name: 'house update'
 * });
 * ````
 */
export default async function update(id: string, house: HouseType): Promise<HouseType> {
  try {

    const houseToUpdate = await House.findByPk(id);

    if (houseToUpdate === null) {
      throw new NotFoundError({name: 'Update an House', message: 'House not found', metadata: house.id});
    }
    houseToUpdate.update(house);
    let houseToReturn = <HouseType>houseToUpdate.get({ plain: true });
    return houseToReturn;

  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: house});
  }
}
