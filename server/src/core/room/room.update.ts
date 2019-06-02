import Room from '../../models/room';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(room: Room): Promise<Room> {
    try {
        const roomToUpdate = await Room.findByPk(room.id);

        if (roomToUpdate === null) {
            throw logger.error('Room not found');
        }

        return roomToUpdate.update(room);
    } catch (e) {
        throw logger.error(e);
    }
}
