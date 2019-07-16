import Variable from '../../models/variable';
import VariableType from './variable.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name variable.desrtoy
 * @description Destroy a variable.
 * @param {String} id - Id of variable.
 * @returns {Promise<void>}
 * @example
 * friday.variable.destroy('1d99601a-cbe8-4eb0-a059-f70f53299050');
 */
export default async function destroy(variable: VariableType): Promise<void> {
  try {
    const variableToDelete = await Variable.findByPk(variable.id);

    if (variableToDelete === null) {
      throw logger.error('Variable not found');
    }

    await variableToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
