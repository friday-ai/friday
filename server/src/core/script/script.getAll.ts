import Script from '../../models/script';
import ScriptType from './script.interface';
import { GetOptions } from '../../utils/constants';
import Log from '../../utils/log';

const logger = new Log();
const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

export default async function getAll(options?: GetOptions): Promise<ScriptType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let scripts;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      scripts = await Script.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      scripts = await Script.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const scriptsPlain = <ScriptType[]>scripts.map((script) => {
      const scriptPlain = script.get({ plain: true });
      return scriptPlain;
    });

    return scriptsPlain;
  } catch (e) {
    throw logger.error(e);
  }
}
