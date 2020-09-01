import Script from '../../models/script';
import ScriptType from './script.interface';
import { GetOptions } from '../../utils/interfaces';
import error from '../../utils/errors/coreError';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
};

/**
 * Get all scripts.
 * @param {GetOptions} options - Options of the query.
 * @returns {Promise<ScriptType[]>} Resolve with script array.
 * @example
 * ````
 * friday.script.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<ScriptType[]> {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    const scripts = await Script.findAll({
      limit: mergedOptions.take,
      offset: mergedOptions.skip,
    });

    const scriptsPlain = <ScriptType[]>scripts.map((script) => {
      const scriptPlain = script.get({ plain: true });
      return scriptPlain;
    });

    return scriptsPlain;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
