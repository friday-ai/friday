import Variable from '../../models/variable';
import Log from '../../utils/log';
const logger = new Log();

export default async function getVariable(variable: Variable): Promise<Variable> {
    try {
        const thisVariable = await Variable.findOne({
            where: { 
                key: variable.key,
                ownerType: variable.ownerType
            }
        });
        return thisVariable.value;
    } catch (e) {
        throw logger.error(e);
    }
}