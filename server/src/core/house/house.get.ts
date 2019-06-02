import House from '../../models/house';
import Log from '../../utils/log';
const logger = new Log();

export default async function get(): Promise<House[]> {
    try {
        const houses = await House.findAll();
        return houses;
    } catch (e) {
        throw logger.error(e);
    }
}
