import System from '.';
import error from '../../utils/errors/coreError';
import VariableType from '../variable/variable.interface';
import { SystemVariablesNames } from '../../utils/constants';
/**
 * Saves actual version of friday
 * @param {String} version The version to save
 * @returns {Promise<VariableType>} Resolve with updated variable
 */
export default async function saveVersion(this: System, version: string): Promise<VariableType> {
  try {
    return await this.variable.update(SystemVariablesNames.FRIDAY_VERSION, { value: version });
  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e });
  }
}
