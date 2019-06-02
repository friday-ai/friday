import Variable from '../../models/variable';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(variable: Variable): Promise<Variable> {
  try {
    const createdVariable = await Variable.create(variable);
    return createdVariable;
  } catch (e) {
    throw logger.error(e);
  }
}
