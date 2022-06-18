import Variable from '../../models/variable';
import { VariableType } from '../../config/entities';
import { BadParametersError, NotFoundError } from '../../utils/decorators/error';

/**
 * Update a variable.
 * @param {String} idOrKey - Id or key of variable
 * @param {VariableType} data - A variable object.
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
export default async function update(idOrKey: string, data: VariableType): Promise<VariableType> {
  if (!idOrKey || idOrKey === '') {
    throw new BadParametersError({ name: 'Update an Variable', message: 'Variable\'s id or key must be specified', metadata: data });
  }

  let variable = await Variable.findByPk(idOrKey);

  // If variable is not found with id, search by key
  if (variable === null) {
    variable = await Variable.findOne({
      where: {
        key: idOrKey,
      },
    });
  }

  if (variable === null) {
    throw new NotFoundError({ name: 'Update an Variable', message: 'Variable not found', metadata: data });
  }

  await variable.update(data);
  return <VariableType>variable.get({ plain: true });
}
