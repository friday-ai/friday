import Script from '../../models/script';
import ScriptType from './script.interface';
import error from '../../utils/errors/coreError';

/**
 * Create a script.
 * @param {ScriptType} script - A script object.
 * @returns {Promise<ScriptType>} Resolve with created script.
 * @example
 * ````
 * friday.script.create({
 *    id: '65e0a906-8b35-49ed-87ba-e30c450a715d',
 *    name: 'Sample script',
 *    code: 'console.log(\'Hey ! This script is a sample ! :)\')'
 * });
 * ````
 */
export default async function create(script: ScriptType): Promise<ScriptType> {
  try {
    const createdScript = await Script.create(script);
    const scriptToReturn = <ScriptType>createdScript.get({ plain: true });
    return scriptToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: script,
    });
  }
}
