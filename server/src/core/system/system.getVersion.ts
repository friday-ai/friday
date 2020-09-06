import error, { NotFoundError } from '../../utils/errors/coreError';
import System from '.';
import { SystemVariablesNames } from '../../utils/constants';
import { version as packageVersion } from '../../../package.json';

/**
 * Get actual version and last saved version of Friday
 * @returns {Promise<Array<String>>} Resolve with an array
 */
export default async function getVersion(this: System): Promise<Array<String>> {
  let savedVersion: string = '';
  try {
    const variable = await this.variable.getValue(SystemVariablesNames.FRIDAY_VERSION);
    savedVersion = variable.value!;
    return [packageVersion, savedVersion];
  } catch (e) {
    if (e.constructor === NotFoundError) {
      return [packageVersion, savedVersion];
    }
    throw error({ name: e.name, message: e.message, cause: e });
  }
}
