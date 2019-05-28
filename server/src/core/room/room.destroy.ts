import Room from '../../models/room';
import Log from '../../utils/log';
const logger = new Log();

export default async function destroy(room: Room): Promise<void> {
    try {
        const roomToDelete = await Room.findByPk(room.id);

        if (roomToDelete === null) {
            throw logger.error('Room not found');
        }

        await roomToDelete.destroy();
    } catch (e) {
        throw logger.error(e);
    }
}
