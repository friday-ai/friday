import House from '../../models/house';
import { default as error, NotFoundError} from '../../utils/error';

/**
 * Destroy an house.
 * @param {String} id - Id of house.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.house.destroy('d5988c5b-c3ae-4aff-ab63-037d855c1978');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const houseToDelete = await House.findByPk(id);

    if (houseToDelete === null) {
      throw new NotFoundError({name: 'Destroy an House', message: 'House not found', metadata: id});
    }

    await houseToDelete.destroy();
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
