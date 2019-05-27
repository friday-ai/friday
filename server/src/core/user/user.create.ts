import User from '../../models/user';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(user: User): Promise<User> {
    try {
        const createdUser = await User.create(user);
        return createdUser;
    } catch (e) {
        throw logger.error(e);
    }
}
