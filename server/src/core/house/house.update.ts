import House from '../../models/house';
import HouseType from './house.interface';
import Log from '../../utils/log';
const logger = new Log();

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
