import User from '../../models/user';
import UserType from './user.interface';
import { GetOptions } from '../../utils/interfaces';
import error from '../../utils/errors/coreError';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
};

/**
 * GEt all users.
 * @param {GetOptions} options - Options of the query.
 * @returns {Promise<UserType[]>} Resolve with user array.
 * @example
 * ````
 * friday.user.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<UserType[]> {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let users;

    if (mergedOptions.scope !== '' && mergedOptions.scope !== null && mergedOptions.scope !== undefined) {
      users = await User.scope(mergedOptions.scope).findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    } else {
      users = await User.findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    }

    const usersPlain = <UserType[]>users.map((user) => {
      const userPlain = user.get({ plain: true });
      return userPlain;
    });

    return usersPlain;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
