import Variable from '../../models/variable';
import VariableType from './variable.interface';
import { default as error, NotFoundError, BadParametersError} from '../../utils/errors/coreError';

/**
 * Update a variable.
 * @param {VariableType} variable - A variable object.
 * @returns {Promise<VariableType>} Resolve with updated variable.
 * @example
 * ````
 * friday.variable.update({
 *   id: '47728070-a1d2-4aaf-9930-47dc82fc1771'
 *   key: 'variable update'
 * });
 * ````
 */
export default async function update(variable: VariableType): Promise<VariableType> {
  try {

    if (!variable.key || variable.key === '') {
      throw new BadParametersError({name: 'Update an Variable', message: 'Variable\'s key must be specified', metadata: variable.key});
    }

    const variableToUpdate = await Variable.findOne({
      where: {key: variable.key}
    });

    if (variableToUpdate === null) {
      throw new NotFoundError({name: 'Update an Variable', message: 'Variable not found', metadata: variable.key});
    }

    variableToUpdate.update(variable);
    let variableToReturn = <VariableType>variableToUpdate.get({ plain: true });
    return variableToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: variable});
  }
}
