import Script from '../../models/script';
import ScriptType from './script.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Update a script.
 * @param {String} id - Id of script
 * @param {ScriptType} script - A script object.
 * @returns {Promise<ScriptType>} Resolve with updated script.
 * @example
 * ````
 * friday.script.update(
 * 'fc5700be-8ed2-4540-a59e-a8572d8c41c5',
 * {
 *   id: 'fc5700be-8ed2-4540-a59e-a8572d8c41c5'
 *   name: 'script update'
 * });
 * ````
 */
export default async function update(id: string, script: ScriptType): Promise<ScriptType> {
  try {
    const scriptToUpdate = await Script.findByPk(id);

    if (scriptToUpdate === null) {
      throw new NotFoundError({ name: 'Update a Script', message: 'Script not found', metadata: script.id });
    }
    await scriptToUpdate.update(script);
    const scriptToReturn = <ScriptType>scriptToUpdate.get({ plain: true });
    return scriptToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: script,
    });
  }
}
