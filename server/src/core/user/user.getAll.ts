import User from '../../models/user';
import UserType from './user.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getAll(): Promise<UserType[]> {
  try {
    const users = await User.findAll();
    return users;
  } catch (e) {
    throw logger.error(e);
  }
}
