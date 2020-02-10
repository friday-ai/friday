import Script from '../../models/script';
import ScriptType from './script.interface';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

/**
 * Get a script by id.
 * @param {String} id - Id of script.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<ScriptType>} Resolve with script.
 * @example
 * ````
 * friday.script.getById('e16be2ff-9ee3-4373-8b40-9f0a2ff04ed3', 'full');
 * ````
 */
export default async function getById(id: string): Promise<ScriptType> {
  try {

    let script;

    script = await Script.findByPk(id);

    if (script === null) {
      throw new NotFoundError({name: 'Get Script by Id', message: 'Script not found', metadata: id});
    }

    let scripteToReturn = <ScriptType>script.get({ plain: true });

    return scripteToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
