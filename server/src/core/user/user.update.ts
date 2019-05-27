import User from '../../models/user';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(user: User): Promise<User> {
    try {
        const userToUpdate = await User.findByPk(user.id);

        if (userToUpdate === null) {
            throw logger.error('User not found');
        }

        return userToUpdate.update(user);
    } catch (e) {
        throw logger.error(e);
    }
}
