import Room from '../../models/room';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Destroy a room.
 * @param {String} id - Id of room.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.room.destroy('c61a79e0-fb49-43be-bd45-507864de978f');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const roomToDelete = await Room.findByPk(id);

    if (roomToDelete === null) {
      throw new NotFoundError({ name: 'Destroy an Room', message: 'Room not found', metadata: id });
    }

    await roomToDelete.destroy();
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
