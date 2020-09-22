import Script from '../../models/script';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Destroy a script.
 * @param {String} id - Id of script.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.script.destroy('95ea9fef-5082-4851-8f3f-3fa93be2b049');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const scriptToDelete = await Script.findByPk(id);

    if (scriptToDelete === null) {
      throw new NotFoundError({ name: 'Destroy a Script', message: 'Script not found', metadata: id });
    }

    await scriptToDelete.destroy();
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
