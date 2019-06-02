import House from '../../models/house';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(house: House): Promise<House> {
    try {
        const houseToUpdate = await House.findByPk(house.id);

        if (houseToUpdate === null) {
            throw logger.error('House not found');
        }

        return houseToUpdate.update(house);
    } catch (e) {
        throw logger.error(e);
    }
}
