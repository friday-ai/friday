import User from '../../models/user';
import UserType from './user.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Update a user.
 * @param {UserType} user - A user object.
 * @returns {Promise<UserType>} Resolve with updated user.
 * @example
 * ````
 * friday.user.update({
 *   id: 'f8be3bad-3d46-4009-b965-fe03a4d6d5f1'
 *   name: 'user update'
 * });
 * ````
 */
export default async function update(user: UserType): Promise<UserType> {
  try {
    const userToUpdate = await User.findByPk(user.id);

    if (userToUpdate === null) {
      throw logger.error('User not found');
    }
    userToUpdate.update(user);
    let userToReturn = <UserType>userToUpdate.get({ plain: true });
    delete userToReturn.password;
    return userToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
