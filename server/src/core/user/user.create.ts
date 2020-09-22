import User from '../../models/user';
import UserType from './user.interface';
import error from '../../utils/errors/coreError';
import setItemState from '../../utils/itemState';
import { AvailableState, StateOwner } from '../../utils/constants';

/**
 * Create a user.
 * @param {UserType} user - A user object.
 * @returns {Promise<UserType>} Resolve with created user.
 * @example
 * ````
 * friday.user.create({
 *    id: '87d636b2-fa65-4f0e-ae04-622562f62c31',
 *    name: 'Pepperwood',
 *    firstName: 'John',
 *    email: 'sample@sample.com',
 *    password: 'mysupersamplepassword',
 *    birthDate: new Date(1996, 12, 20)
 * });
 * ````
 */
export default async function create(user: UserType): Promise<UserType> {
  try {
    const createdUser = await User.create(user);
    const userToReturn = <UserType>createdUser.get({ plain: true });
    setItemState(
      userToReturn.id!,
      userToReturn.id!,
      StateOwner.USER,
      AvailableState.USER_AT_HOME,
    );
    delete userToReturn.password;
    return userToReturn;
  } catch (e) {
    delete user.password;
    throw error({
      name: e.name, message: e.message, cause: e, metadata: user,
    });
  }
}
