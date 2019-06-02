import House from '../../models/house';
import Log from '../../utils/log';
const logger = new Log();

export default async function getHouse(id: string): Promise<House> {
  try {
    const house = await House.findByPk(id);

    if (house === null) {
      throw logger.error('House not found');
    }

    return house;
  } catch (e) {
    throw logger.error(e);
  }
}
