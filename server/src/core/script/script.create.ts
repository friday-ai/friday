import Script from '../../models/script';
import ScriptType from './script.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(script: ScriptType): Promise<ScriptType> {
  try {
    const createdScript = await Script.create(script);
    let scriptToReturn = <ScriptType>createdScript.get({ plain: true });
    return scriptToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
