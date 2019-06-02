import User from '../../models/user';
import UserType from './user.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(user: UserType): Promise<UserType> {
    try {
        const userToUpdate = await User.findByPk(user.id);

        if (userToUpdate === null) {
            throw logger.error('User not found');
        }
        userToUpdate.update(user);
        let userToReturn = <UserType> userToUpdate.get({plain: true});
        delete userToReturn.password;
        return userToReturn;
    } catch (e) {
        throw logger.error(e);
    }
}
