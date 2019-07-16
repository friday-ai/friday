import Variable from '../../models/variable';
import VariableType from './variable.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name variable.getValue
 * @description Get a variable value by key.
 * @param {String} key - Key of variable.
 * @returns {Promise<VariableType>} Resolve with variable.
 * @example
 * friday.variable.getValue('key');
 */
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
