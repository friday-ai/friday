import Script from '../../models/script';
import ScriptType from './script.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getById(id: string, scope?: string): Promise<ScriptType> {
  try {

    let script;

    script = await Script.findByPk(id);

    if (script === null) {
      throw logger.error('Script not found');
    }

    let scripteToReturn = <ScriptType>script.get({ plain: true });

    return scripteToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
