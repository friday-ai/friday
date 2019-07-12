import User from '../../models/user';
import UserType from './user.interface';
import { GetOptions } from '../../utils/constants';
import Log from '../../utils/log';

const logger = new Log();
const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

export default async function getAll(options?: GetOptions): Promise<UserType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let users;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      users = await User.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      users = await User.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const usersPlain = <UserType[]>users.map((user) => {
      const userPlain = user.get({ plain: true });
      return userPlain;
    });

    return usersPlain;

  } catch (e) {
    throw logger.error(e);
  }
}