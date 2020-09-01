import Script from '../../models/script';
import ScriptType from './script.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Get a script by id.
 * @param {String} id - Id of script.
 * @returns {Promise<ScriptType>} Resolve with script.
 * @example
 * ````
 * friday.script.getById('e16be2ff-9ee3-4373-8b40-9f0a2ff04ed3', 'full');
 * ````
 */
export default async function getById(id: string): Promise<ScriptType> {
  try {
    const script = await Script.findByPk(id);

    if (script === null) {
      throw new NotFoundError({ name: 'Get Script by Id', message: 'Script not found', metadata: id });
    }

    const scriptToReturn = <ScriptType>script.get({ plain: true });

    return scriptToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
