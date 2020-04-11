import error, { NotFoundError } from '../../utils/errors/coreError';
import System from '.';
import { SystemVariablesNames } from '../../../src/utils/constants';

const actualVersion: string = process.env.npm_package_version!;

/**
 * Get actual version and last saved version of Friday
 * @returns {Promise<Array<String>>} Resolve with an array
 */
export default async function getVersion(this: System): Promise<Array<String>> {
  let savedVersion: string = '';
  try {
    const variable = await this.variable.getValue(SystemVariablesNames.FRIDAY_VERSION);
    savedVersion = variable.value!;
    return [ actualVersion, savedVersion ];
  } catch (e) {
    if (e.constructor === NotFoundError) {
      return [ actualVersion, savedVersion ];
    } else {
      throw error({name: e.name, message: e.message, cause: e});
    }
  }
}
