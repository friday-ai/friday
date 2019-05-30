import House from '../../models/house';
import Log from '../../utils/log';
import Room from '../../models/room';
import getHouse from './house.getHouse';

const logger = new Log();

export default async function getRooms(house: House): Promise<Room[]> {
    try {
        const thisHouse = await getHouse(house);
        return thisHouse.room;
    } catch (e) {
        throw logger.error(e);
    }
}
