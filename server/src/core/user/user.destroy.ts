import User from '../../models/user';
import Log from '../../utils/log';
const logger = new Log();

export default async function destroy(user: User): Promise<void> {
    try {
        const userToDelete = await User.findByPk(user.id);

        if (userToDelete === null) {
            throw logger.error('User not found');
        }

        await userToDelete.destroy();
    } catch (e) {
        throw logger.error(e);
    }
}
