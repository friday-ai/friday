import System from './system';
import { VariableType } from '../../config/entities';
import { SystemVariablesNames } from '../../config/constants';
/**
 * Saves actual version of friday
 * @param {String} version The version to save
 * @returns {Promise<VariableType>} Resolve with updated variable
 */
export default async function saveVersion(this: System, version: string): Promise<VariableType> {
  return this.variable.update(SystemVariablesNames.FRIDAY_VERSION, { value: version });
}
