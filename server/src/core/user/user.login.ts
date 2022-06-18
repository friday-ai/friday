import User from '../../models/user';
import { UserType } from '../../config/entities';
import { NotFoundError, AuthError } from '../../utils/decorators/error';
import { compare } from '../../utils/password';

/**
 * User login
 * @private
 * @param {string} email - The email of the user.
 * @param {string} password - The password for his account.
 * @returns {Promise<UserType>} Resolve with user.
 * @example
 * await friday.user.login('test@test.fr', 'mypassword');
 *
 */
export default async function login(email: string, password: string): Promise<UserType> {
  const user = await User.findOne({
    where: {
      email,
    },
    attributes: ['password'],
  });

  if (user === null) {
    throw new NotFoundError({ name: 'User login', message: 'User not found', metadata: email });
  }

  const userToReturn = <UserType>user.get({ plain: true });
  const passwordMatches = await compare(password, userToReturn.password!);

  if (!passwordMatches) {
    throw new AuthError({ name: 'User login', message: 'Password not matches.', metadata: email });
  }

  delete userToReturn.password;
  return userToReturn;
}
