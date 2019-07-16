import Script from '../../models/script';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name script.desrtoy
 * @description Destroy a script.
 * @param {String} id - Id of script.
 * @returns {Promise<void>}
 * @example
 * friday.script.destroy('95ea9fef-5082-4851-8f3f-3fa93be2b049');
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const scriptToDelete = await Script.findByPk(id);

    if (scriptToDelete === null) {
      throw logger.error('Script not found');
    }

    await scriptToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
