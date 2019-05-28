import House from '../../models/house';
import Log from '../../utils/log';
const logger = new Log();

export default async function getHouse(house: House): Promise<House> {
    try {
        return await House.findByPk(house.id);
    } catch (e) {
        throw logger.error(e);
    }
}
