import User from '../../models/user';
import UserType from './user.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name user.create
 * @description Create a user.
 * @param {UserType} user - A user object.
 * @returns {Promise<UserType>} Resolve with created user.
 * @example
 * friday.user.create({
 *    id: '87d636b2-fa65-4f0e-ae04-622562f62c31',
 *    name: 'Pepperwood',
 *    firstName: 'John',
 *    email: 'sample@sample.com',
 *    password: 'mysupersamplepassword',
 *    birthDate: new Date(1996, 12, 20)
 * });
 */
export default async function create(user: UserType): Promise<UserType> {
  try {
    const createdUser = await User.create(user);
    let userToReturn = <UserType>createdUser.get({ plain: true });
    delete userToReturn.password;
    return userToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
