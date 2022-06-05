import User from '../../models/user';
import error from '../../utils/errors/coreError';

/**
 * Get count of users.
 * @returns {Promise<number>} Resolve with number of users.
 * @example
 * ````
 * friday.user.getCount();
 * ````
 */
export default async function getCount(): Promise<number> {
  try {
    const users = await User.findAndCountAll({});
    return users.count;
  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e });
  }
}
