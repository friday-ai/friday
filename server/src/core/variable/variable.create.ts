import Variable from '../../models/variable';
import VariableType from './variable.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(variable: VariableType): Promise<VariableType> {
  try {
    const createdVariable = await Variable.create(variable);
    let variableToReturn = <VariableType>createdVariable.get({ plain: true });
    return variableToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
