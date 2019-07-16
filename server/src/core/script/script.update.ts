import Script from '../../models/script';
import ScriptType from './script.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name script.update
 * @description Update a script.
 * @param {ScriptType} script - A script object.
 * @returns {Promise<ScriptType>} Resolve with updated script.
 * @example
 * friday.script.update({
 *   id: 'fc5700be-8ed2-4540-a59e-a8572d8c41c5'
 *   name: 'script update'
 * });
 */
export default async function update(script: ScriptType): Promise<ScriptType> {
  try {
    const scriptToUpdate = await Script.findByPk(script.id);

    if (scriptToUpdate === null) {
      throw logger.error('Script not found');
    }
    scriptToUpdate.update(script);
    let scriptToReturn = <ScriptType>scriptToUpdate.get({ plain: true });
    return scriptToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
