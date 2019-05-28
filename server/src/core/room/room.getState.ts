import Room from '../../models/room';
import Log from '../../utils/log';
import State from '../../models/state';

const logger = new Log();

export default async function getState(room: Room): Promise<State> {
    try {
        return room.state;
    } catch (e) {
        throw logger.error(e);
    }
}
