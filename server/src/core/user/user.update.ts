import User from '../../models/user';
import UserType from './user.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Update a user.
 * @param {String} id - Id of user
 * @param {UserType} user - A user object.
 * @returns {Promise<UserType>} Resolve with updated user.
 * @example
 * ````
 * friday.user.update(
 * 'f8be3bad-3d46-4009-b965-fe03a4d6d5f1',
 * {
 *   id: 'f8be3bad-3d46-4009-b965-fe03a4d6d5f1'
 *   userName: 'user update'
 * });
 * ````
 */
export default async function update(id: string, user: UserType): Promise<UserType> {
  try {
    const userToUpdate = await User.findByPk(id);

    if (userToUpdate === null) {
      throw new NotFoundError({ name: 'Update a User', message: 'User not found', metadata: user.id });
    }
    await userToUpdate.update(user);
    const userToReturn = <UserType>userToUpdate.get({ plain: true });
    delete userToReturn.password;
    return userToReturn;
  } catch (e) {
    delete user.password;
    throw error({
      name: e.name, message: e.message, cause: e, metadata: user,
    });
  }
}
