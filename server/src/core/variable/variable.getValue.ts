import Variable from '../../models/variable';
import VariableType from './variable.interface';
import { default as error, NotFoundError, BadParametersError} from '../../utils/errors/coreError';

/**
 * Get a variable value by key.
 * @param {String} key - Key of variable.
 * @returns {Promise<VariableType>} Resolve with variable.
 * @example
 * ````
 * friday.variable.getValue('key');
 * ````
 */
export default async function getValue(key: string): Promise<VariableType> {
  try {

    if (key === '') {
      throw new BadParametersError({name: 'Get value of an Variable', message: 'Variable\'s key can not be empty', metadata: key});
    }

    const variable = await Variable.findOne({
      where: {
        key: key
      }
    });

    if (variable === null) {
      throw new NotFoundError({name: 'Get value of an Variable', message: 'Variable not found', metadata: key});
    }

    let variableToReturn = <VariableType>variable.get({ plain: true });
    return variableToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: key});
  }
}
