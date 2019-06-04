import User from '../../models/user';
import UserType from './user.interface';
import Log from '../../utils/log';
const logger = new Log();

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
