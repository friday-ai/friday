import House from '../../models/house';
import Log from '../../utils/log';
import State from '../../models/state';

const logger = new Log();

export default async function getState(house: House): Promise<State> {
    try {
        return house.state;
    } catch (e) {
        throw logger.error(e);
    }
}
