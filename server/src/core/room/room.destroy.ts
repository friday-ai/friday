import Room from '../../models/room';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name room.desrtoy
 * @description Destroy a room.
 * @param {String} id - Id of room.
 * @returns {Promise<void>}
 * @example
 * friday.room.destroy('c61a79e0-fb49-43be-bd45-507864de978f');
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const roomToDelete = await Room.findByPk(id);

    if (roomToDelete === null) {
      throw logger.error('Room not found');
    }

    await roomToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
