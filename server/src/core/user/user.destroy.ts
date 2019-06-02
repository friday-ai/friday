import User from '../../models/user';
import Log from '../../utils/log';
const logger = new Log();

export default async function destroy(id: string): Promise<void> {
    try {
        const userToDelete = await User.findByPk(id);

        if (userToDelete === null) {
            throw logger.error('User not found');
        }

        await userToDelete.destroy();
    } catch (e) {
        throw logger.error(e);
    }
}
