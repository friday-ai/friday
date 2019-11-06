import Satellite from '../../models/satellite';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

/**
 * Destroy a satellite.
 * @param {String} id - Id of satellite.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.satellite.destroy('ac21d402-35a9-4cbc-8ea9-33a2cff93b7a');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const satelliteToDelete = await Satellite.findByPk(id);

    if (satelliteToDelete === null) {
      throw new NotFoundError({name: 'Destroy a Satellite', message: 'Satellite not found', metadata: id});
    }

    await satelliteToDelete.destroy();
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
