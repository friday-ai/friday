import Variable from '../../models/variable';
import VariableType from './variable.interface';
import Log from '../../utils/log';
const logger = new Log();

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
