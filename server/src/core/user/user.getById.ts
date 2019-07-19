import User from '../../models/user';
import UserType from './user.interface';
import Log from '../../utils/log';

const logger = new Log();

/**
 * Get a user by id.
 * @param {String} id - Id of user.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<UserType>} Resolve with user.
 * @example
 * ````
 * friday.user.getById('a8ba342e-854a-4906-8670-d400c868bdb1', 'full');
 * ````
 */
export default async function getById(id: string, scope?: string): Promise<UserType> {
  try {

    let user;

    if (scope !== '' && scope !== null && scope !== undefined) {
      user = await User.scope(scope).findByPk(id);
    } else {
      user = await User.findByPk(id, {
        attributes: ['id', 'name', 'firstName', 'email', 'birthDate']
      });
    }

    if (user === null) {
      throw logger.error('User not found');
    }

    let userToReturn = <UserType>user.get({ plain: true });
    delete userToReturn.password;

    return userToReturn;

  } catch (e) {
    throw logger.error(e);
  }
}
