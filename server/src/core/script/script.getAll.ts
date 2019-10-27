import Script from '../../models/script';
import ScriptType from './script.interface';
import { GetOptions } from '../../utils/constants';
import error from '../../utils/error';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

/**
 * Get all scripts.
 * @param {Getoptions} options - Options of the query.
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
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let scripts;

    scripts = await Script.findAll({
      limit: options.take,
      offset: options.skip
    });

    const scriptsPlain = <ScriptType[]>scripts.map((script) => {
      const scriptPlain = script.get({ plain: true });
      return scriptPlain;
    });

    return scriptsPlain;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: options});
  }
}
