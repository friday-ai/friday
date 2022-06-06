import Variable from '../../models/variable';
import VariableType from './variable.interface';
import error, { BadParametersError, NotFoundError } from '../../utils/errors/coreError';

/**
 * Update a variable.
 * @param {String} idOrKey - Id or key of variable
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
export default async function update(idOrKey: string, variable: VariableType): Promise<VariableType> {
  try {
    if (!idOrKey || idOrKey === '') {
      throw new BadParametersError({ name: 'Update an Variable', message: 'Variable\'s id or key must be specified', metadata: variable });
    }

    let variableToUpdate = await Variable.findByPk(idOrKey);

    // If variable is not found with id, search by key
    if (variableToUpdate === null) {
      variableToUpdate = await Variable.findOne({
        where: {
          key: idOrKey,
        },
      });
    }

    if (variableToUpdate === null) {
      throw new NotFoundError({ name: 'Update an Variable', message: 'Variable not found', metadata: variable });
    }

    await variableToUpdate.update(variable);
    const variableToReturn = <VariableType>variableToUpdate.get({ plain: true });
    return variableToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: variable,
    });
  }
}
