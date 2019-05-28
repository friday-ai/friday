import House from '../../models/house';
import Log from '../../utils/log';
const logger = new Log();

export default async function destroy(house: House): Promise<void> {
    try {
        const houseToDelete = await House.findByPk(house.id);

        if (houseToDelete === null) {
            throw logger.error('House not found');
        }

        await houseToDelete.destroy();
    } catch (e) {
        throw logger.error(e);
    }
}
