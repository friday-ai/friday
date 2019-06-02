import Room from '../../models/room';
import Log from '../../utils/log';
import State from '../../models/state';
import getRoom from './room.getRoom';

const logger = new Log();

export default async function getState(room: Room): Promise<State> {
    try {
        const thisRoom = await getRoom(room.id);
        return thisRoom.state;
    } catch (e) {
        throw logger.error(e);
    }
}
