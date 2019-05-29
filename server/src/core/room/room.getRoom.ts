import Room from '../../models/room';
import Log from '../../utils/log';
const logger = new Log();

export default async function getRoom(room: Room): Promise<Room> {
    try {
        return await Room.findByPk(room.id);
    } catch (e) {
        throw logger.error(e);
    }
}