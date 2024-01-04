import { SystemVariablesNames, SystemSettings } from '@friday-ai/shared';
import error from '../../utils/decorators/error';
import System from './system';

/**
 * Get actual version and last saved version of Friday
 * @returns {Promise<Array<String>>} Resolve with an array
 */
export default async function getSettings(this: System): Promise<SystemSettings> {
  try {
    const version = await this.variable.getValue(SystemVariablesNames.FRIDAY_VERSION);
    const units = await this.variable.getValue(SystemVariablesNames.UNITS);
    const history = await this.variable.getValue(SystemVariablesNames.HISTORY_STATE_IN_DAYS);

    return { version: version.value, units: units.value, history: history.value };
  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e });
  }
}
