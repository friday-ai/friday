import House from '../../models/house';
import Log from '../../utils/log';
import Room from '../../models/room';

const logger = new Log();

export default async function getRooms(house: House): Promise<Room[]> {
    try {
        return house.room;
    } catch (e) {
        throw logger.error(e);
    }
}
