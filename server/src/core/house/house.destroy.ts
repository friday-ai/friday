import House from '../../models/house';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name house.desrtoy
 * @description Destroy an house.
 * @param {String} id - Id of house.
 * @returns {Promise<void>}
 * @example
 * friday.house.destroy('d5988c5b-c3ae-4aff-ab63-037d855c1978');
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const houseToDelete = await House.findByPk(id);

    if (houseToDelete === null) {
      throw logger.error('House not found');
    }

    await houseToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
