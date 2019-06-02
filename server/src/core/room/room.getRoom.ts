import Room from '../../models/room';
import Log from '../../utils/log';
const logger = new Log();

export default async function getRoom(id: string): Promise<Room> {
    try {
        const room = await Room.findByPk(id);

        if (room === null) {
            throw logger.error('Room not found');
        }

        return room;
    } catch (e) {
        throw logger.error(e);
    }
}
