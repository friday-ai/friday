import Variable from '../../models/variable';
import VariableType from './variable.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name variable.update
 * @description Update a variable.
 * @param {VariableType} variable - A variable object.
 * @returns {Promise<VariableType>} Resolve with updated variable.
 * @example
 * friday.variable.update({
 *   id: '47728070-a1d2-4aaf-9930-47dc82fc1771'
 *   key: 'variable update'
 * });
 */
export default async function update(variable: VariableType): Promise<VariableType> {
  try {

    if (!variable.key || variable.key === '') {
      throw logger.error('Variable\'s key must be specified');
    }

    const variableToUpdate = await Variable.findOne({
      where: {key: variable.key}
    });

    if (variableToUpdate === null) {
      throw logger.error('Variable not found');
    }

    variableToUpdate.update(variable);
    let variableToReturn = <VariableType>variableToUpdate.get({ plain: true });
    return variableToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
