import User from '../../models/user';
import Log from '../../utils/log';
const logger = new Log();

export default async function getAll(user: User): Promise<User[]> {
    try {
        const users = await User.findAll();
        return users;
    } catch (e) {
        throw logger.error(e);
    }
}
