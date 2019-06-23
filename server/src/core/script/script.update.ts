import Script from '../../models/script';
import ScriptType from './script.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(script: ScriptType): Promise<ScriptType> {
  try {
    const scriptToUpdate = await Script.findByPk(script.id);

    if (scriptToUpdate === null) {
      throw logger.error('Script not found');
    }
    scriptToUpdate.update(script);
    let scriptToReturn = <ScriptType>scriptToUpdate.get({ plain: true });
    return scriptToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
