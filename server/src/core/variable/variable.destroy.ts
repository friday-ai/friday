import Variable from '../../models/variable';
import VariableType from './variable.interface';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

/**
 * Destroy a variable.
 * @param {String} id - Id of variable.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.variable.destroy('1d99601a-cbe8-4eb0-a059-f70f53299050');
 * ````
 */
export default async function destroy(variable: VariableType): Promise<void> {
  try {
    const variableToDelete = await Variable.findByPk(variable.id);

    if (variableToDelete === null) {
      throw new NotFoundError({name: 'Destroy an Variable', message: 'Variable not found', metadata: variable.id});
    }

    await variableToDelete.destroy();
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: variable});
  }
}
