import Variable from '../../models/variable';
import VariableType from './variable.interface';
import { default as error, NotFoundError, BadParametersError} from '../../utils/errors/coreError';

/**
 * Update a variable.
 * @param {String} id - Id of variable
 * @param {VariableType} variable - A variable object.
 * @returns {Promise<VariableType>} Resolve with updated variable.
 * @example
 * ````
 * friday.variable.update(
 * '47728070-a1d2-4aaf-9930-47dc82fc1771',
 * {
 *   id: '47728070-a1d2-4aaf-9930-47dc82fc1771'
 *   key: 'variable update'
 * });
 * ````
 */
export default async function update(id: string, variable: VariableType): Promise<VariableType> {
  try {

    if (!id || id === '') {
      throw new BadParametersError({name: 'Update an Variable', message: 'Variable\'s id must be specified', metadata: id});
    }

    const variableToUpdate = await Variable.findByPk(id);

    if (variableToUpdate === null) {
      throw new NotFoundError({name: 'Update an Variable', message: 'Variable not found', metadata: id});
    }

    variableToUpdate.update(variable);
    let variableToReturn = <VariableType>variableToUpdate.get({ plain: true });
    return variableToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: variable});
  }
}
