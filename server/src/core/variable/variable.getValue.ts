import Variable from '../../models/variable';
import VariableType from './variable.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getValue(key: string): Promise<VariableType> {
  try {

    if (key === '') {
      throw logger.error('Variable\'s key can not be empty');
    }

    const variable = await Variable.findOne({
      where: {
        key: key
      }
    });

    if (variable === null) {
      throw logger.error('Variable not found');
    }

    let variableToReturn = <VariableType>variable.get({ plain: true });
    return variableToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
