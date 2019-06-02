import House from '../../models/house';
import Log from '../../utils/log';
import State from '../../models/state';
import getHouse from './house.getHouse';

const logger = new Log();

export default async function getState(house: House): Promise<State> {
    try {
        const thisHouse = await getHouse(house.id);
        return thisHouse.state;
    } catch (e) {
        throw logger.error(e);
    }
}
