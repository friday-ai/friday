import House from '../../models/house';
import HouseType from './house.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(house: HouseType): Promise<HouseType> {
  try {
    const createdHouse = await House.create(house);
    let houseToReturn = <HouseType>createdHouse.get({ plain: true });
    return houseToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
