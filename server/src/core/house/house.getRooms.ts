import House from '../../models/house';
import Log from '../../utils/log';
import Room from '../../models/room';
import getById from './house.getById';

const logger = new Log();

export default async function getRooms(house: House): Promise<Room[]> {
  try {
    const thisHouse = await getById(house.id);
    return thisHouse.rooms;
  } catch (e) {
    throw logger.error(e);
  }
}
