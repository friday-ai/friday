import { UserAttributes } from '@friday/shared';
import User from '../../models/user';
import { AuthError, NotFoundError } from '../../utils/decorators/error';
import { compare } from '../../utils/password';
import logger from '../../utils/log';

/**
 * User login
 * @private
 * @param {string} email - The email of the user.
 * @param {string} password - The password for his account.
 * @returns {Promise<UserAttributes>} Resolve with user.
 * @example
 * await friday.user.login('test@test.fr', 'mypassword');
 *
 */
export default async function login(email: string, password: string): Promise<Omit<UserAttributes, 'password'>> {
  const user = await User.findOne({
    where: {
      email,
    },
    attributes: ['password'],
  });

  if (user === null) {
    throw new NotFoundError({ name: 'User login', message: 'User not found', metadata: email });
  }

  const userToReturn = <UserAttributes>user.get({ plain: true });
  const passwordMatches = await compare(password, userToReturn.password);

  if (!passwordMatches) {
    throw new AuthError({ name: 'User login', message: 'Password not matches.', metadata: email });
  }

  logger.success(`User ${user.userName} logged in`);

  return userToReturn;
}
