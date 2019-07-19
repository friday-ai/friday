import User from '../../models/user';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Destroy a user.
 * @param {String} id - Id of user.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.user.destroy('e8768abf-f6c9-4689-9ca4-2fe663e4ce9f');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const userToDelete = await User.findByPk(id);

    if (userToDelete === null) {
      throw logger.error('User not found');
    }

    await userToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
