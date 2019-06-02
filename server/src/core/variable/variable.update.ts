import Variable from '../../models/variable';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(variable: Variable): Promise<Variable> {
  try {
    const variableToUpdate = await Variable.findByPk(variable.id);

    if (variableToUpdate === null) {
      throw logger.error('Variable not found');
    }

    return variableToUpdate.update(variable);
  } catch (e) {
    throw logger.error(e);
  }
}
