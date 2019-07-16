import Variable from '../../models/variable';
import VariableType from './variable.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name variable.create
 * @description Create a variable.
 * @param {VariableType} variable - A variable object.
 * @returns {Promise<VariableType>} Resolve with created variable.
 * @example
 * friday.variable.create({
 *    id: '532aea33-3bff-479e-af74-ef678f012a51',
 *    key: 'key sample',
 *    value: 'value sample',
 *    owner: 'a2020069-9e06-48d9-9fa1-0b5628e612c4',
 *    ownerType: VariableOwner.USER
 * });
 */
export default async function create(variable: VariableType): Promise<VariableType> {
  try {
    const createdVariable = await Variable.create(variable);
    let variableToReturn = <VariableType>createdVariable.get({ plain: true });
    return variableToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
