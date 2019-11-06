import User from '../../models/user';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

/**
 * Destroy a user.
 * @param {String} id - Id of user.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.user.destroy('e8768abf-f6c9-4689-9ca4-2fe663e4ce9f');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const userToDelete = await User.findByPk(id);

    if (userToDelete === null) {
      throw new NotFoundError({name: 'Destroy a User', message: 'User not found', metadata: id});
    }

    await userToDelete.destroy();
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
