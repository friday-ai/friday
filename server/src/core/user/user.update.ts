import User from '../../models/user';
import UserType from './user.interface';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

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
      throw new NotFoundError({name: 'Update a User', message: 'User not found', metadata: user.id});
    }
    userToUpdate.update(user);
    let userToReturn = <UserType>userToUpdate.get({ plain: true });
    delete userToReturn.password;
    return userToReturn;
  } catch (e) {
    delete user.password;
    throw error({name: e.name, message: e.message, cause: e, metadata: user});
  }
}
