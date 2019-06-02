import House from '../../models/house';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(house: House): Promise<House> {
  try {
    const createdHouse = await House.create(house);
    return createdHouse;
  } catch (e) {
    throw logger.error(e);
  }
}
