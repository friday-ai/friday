import Variable from '../../models/variable';
import VariableType from './variable.interface';
import Log from '../../utils/log';
const logger = new Log();

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
