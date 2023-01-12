import { VariableAttributes, SystemVariablesNames } from '@friday/shared';
import System from './system';
/**
 * Saves actual version of friday
 * @param {String} version The version to save
 * @returns {Promise<VariableAttributes>} Resolve with updated variable
 */
export default async function saveVersion(this: System, version: string): Promise<VariableAttributes> {
  return this.variable.update(SystemVariablesNames.FRIDAY_VERSION, { value: version });
}
