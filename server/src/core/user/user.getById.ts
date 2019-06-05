import User from '../../models/user';
import UserType from './user.interface';
import Log from '../../utils/log';

const logger = new Log();

export default async function getById(id: string, scope?: string): Promise<UserType> {
  try {

    let user;

    if (scope !== '' && scope !== null && scope !== undefined) {
      user = await User.scope(scope).findByPk(id);
    } else {
      user = await User.findByPk(id, {
        attributes: ['id', 'name', 'first_name', 'email', 'birth_date']
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
